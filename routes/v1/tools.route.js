const express = require("express");
const toolsController = require("../../controller/tools.controller");
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('This is the tools route');
// })

// router.post('/tool', (req, res) => {
//     res.send('tool added');
// })

/***
 *
 * @api {get} /tools All tools
 * @apiDescription Get all the tools
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization User's access token
 *
 * @apiParam {Number{1-}}          [page=1]     List page
 * @apiParam {Number{1-100}}       [limit=10]   Users per page
 *
 * @apiSuccess {Obect[]} all the tools.
 *
 * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
 * @apiError (Forbidden 403)    Forbidden    Only admins can access the data
 *
 */

router
    .route("/")
    /***
     *
     * @api {get} /tools All tools
     * @apiDescription Get all the tools
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization User's access token
     *
     * @apiParam {Number{1-}}          [page=1]     List page
     * @apiParam {Number{1-100}}       [limit=10]   Users per page
     *
     * @apiSuccess {Obect[]} all the tools.
     *
     * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
     * @apiError (Forbidden 403)    Forbidden    Only admins can access the data
     *
     */
    .get(toolsController.getAllTools)
    /***
     *
     * @api {post} /tools All tools
     * @apiDescription Save a tool
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization User's access token
     *
     * @apiParam {Number{1-}}          [page=1]     List page
     * @apiParam {Number{1-100}}       [limit=10]   Users per page
     *
     * @apiSuccess {Obect[]} all the tools.
     *
     * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
     * @apiError (Forbidden 403)    Forbidden    Only admins can access the data
     *
     */
    .post(toolsController.saveATool);

module.exports = router;
