let express = require('express');
let router = express.Router();

const users = require('../models/users');

const isValidId = (req, res, next) => {
    if (isNaN(req.params.id)) {
        return new Error('Invalid ID');
    }

    return next();
};

router
    .route('/')
    .get((req, res, next) => {
        let { page, size } = req.query;

        // page numbers start from 1
        // page 0 being treated as 1
        if (isNaN(page)) {
            page = 0;
        } else {
            page = Math.max(0, page - 1);
        }

        if (isNaN(size)) {
            size = 20;
        }

        users
            .query()
            .page(page, size)
            .then(users => res.json(users))
            .catch(next);
    })

    .post((req, res, next) => {
        // todo
        // validate input
        users
            .query()
            .insert(req.body)
            .then(user => {
                res.status(201);
                res.json(user);
            })
            .catch(next);
    });

router
    .route('/:id')
    .get(isValidId, (req, res, next) => {
        users
            .query()
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return next();
                }
                res.json(user);
            })
            .catch(next);
    })
    .put(isValidId, (req, res, next) => {
        users
            .query()
            .updateAndFetchById(req.params.id, req.body)
            .then(user => {
                if (!user) {
                    return next();
                }
                res.json(user);
            })
            .catch(next);
    })
    .patch(isValidId, (req, res, next) => {
        users
            .query()
            .patchAndFetchById(req.params.id, req.body)
            .then(user => {
                if (!user) {
                    return next();
                }
                res.status(202);
                res.json(user);
            })
            .catch(next);
    })
    .delete(isValidId, (req, res, next) => {
        users
            .query()
            .findById(req.params.id)
            .del()
            .then(user => {
                if (!user) {
                    return next();
                }
                res.status(204);
                res.json();
            })
            .catch(next);
    });

// router.use('/:userId/friends', require('./friends'));
router.route('/:id/friends').get(isValidId, (req, res) => {
    const Friend = require('../models/friends');
    let { page, size } = req.query;

    // page numbers start from 1
    // page 0 being treated as 1
    if (isNaN(page)) {
        page = 0;
    } else {
        page = Math.max(0, page - 1);
    }

    if (isNaN(size)) {
        size = 20;
    }

    users
        .query()
        .page(page, size)
        .whereIn(
            'id',
            Friend.query()
                .where('userId', req.params.id)
                .select('friendId')
        )
        .then(users => res.json(users));
});

router.route('/:id/friends-of-friends').get(isValidId, (req, res) => {
    const Friend = require('../models/friends');
    let { page, size } = req.query;

    // page numbers start from 1
    // page 0 being treated as 1
    if (isNaN(page)) {
        page = 0;
    } else {
        page = Math.max(0, page - 1);
    }

    if (isNaN(size)) {
        size = 20;
    }

    users
        .query()
        .page(page, size)
        .whereIn(
            'id',
            Friend.query()
                .whereIn(
                    'userId',
                    Friend.query()
                        .where('userId', req.params.id)
                        .select('friendId')
                )
                .select('friendId')
        )
        .then(users => res.json(users));
});

module.exports = router;
