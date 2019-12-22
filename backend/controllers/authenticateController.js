var dbservice = require('../services/dbservice');
// var HttpStatus = require('http-status-codes');
// var moment = require('moment');
// var bcrypt = require('bcrypt');
var config = require('../config');

class UserController {

    async list(req, res) {
        const sql = await dbservice.connect();
        const result = await sql.query`
            SELECT *
            FROM [user]
            `;
        await dbservice.close();

        res.json(result.recordset);
    }

    async create(req, res) {
        const sql = await dbservice.connect();

        const result = await sql.query`
            INSERT INTO [user]
                ([firstname],[nickname],[lastname],[address],[zipcode],[country],[city],[ssn],[profession],[email]
                    ,[phone],[barcode],[info],[invitation],[deceased],[veteran],[gender_id])
            VALUES
                (${req.body.firstname},${req.body.nickname},${req.body.lastname},${req.body.address},${req.body.zipcode}
                ,${req.body.country},${req.body.city},${req.body.ssn},${req.body.profession},${req.body.email},${req.body.phone}
                ,${req.body.barcode},${req.body.info},${req.body.invitation ? 1 : 0},${req.body.deceased ? 1 : 0},${req.body.veteran ? 1 : 0}
                ,${req.body.gender_id})
            `;
        await dbservice.close();

        if (result.rowsAffected[0] == 0) {
            res.sendStatus(HttpStatus.BAD_REQUEST);
        } else {
            res.sendStatus(HttpStatus.CREATED);
        }
    }

    async get(req, res) {
        const sql = await dbservice.connect();
        const result = await sql.query`
            SELECT *
            FROM [user]
            WHERE id = ${req.params.userId}
            `;
        await dbservice.close();

        if (result.recordset.length == 0) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        } else {
            res.json(result.recordset[0]);
        }
    }

    async update(req, res) {
        const sql = await dbservice.connect();
        const result = await sql.query`
            SELECT *
            FROM [user]
            WHERE id = ${req.params.userId}
            `;

        if (result.recordset.length == 0) {
            await dbservice.close();
            res.sendStatus(HttpStatus.NOT_FOUND);
        } else {
            const user = result.recordset[0];

            user.firstname = req.body.firstname !== undefined ? req.body.firstname : user.firstname;
            user.nickname = req.body.nickname !== undefined ? req.body.nickname : user.nickname;
            user.lastname = req.body.lastname !== undefined ? req.body.lastname : user.lastname;
            user.address = req.body.address !== undefined ? req.body.address : user.address;
            user.zipcode = req.body.zipcode !== undefined ? req.body.zipcode : user.zipcode;
            user.country = req.body.country !== undefined ? req.body.country : user.country;
            user.city = req.body.city !== undefined ? req.body.city : user.city;
            user.ssn = req.body.ssn !== undefined ? req.body.ssn : user.ssn;
            user.profession = req.body.profession !== undefined ? req.body.profession : user.profession;
            user.email = req.body.email !== undefined ? req.body.email : user.email;
            user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
            user.barcode = req.body.barcode !== undefined ? req.body.barcode : user.barcode;
            user.info = req.body.info !== undefined ? req.body.info : user.info;
            user.invitation = req.body.invitation !== undefined ? req.body.invitation : user.invitation;
            user.deceased = req.body.deceased !== undefined ? req.body.deceased : user.deceased;
            user.veteran = req.body.veteran !== undefined ? req.body.veteran : user.veteran;
            user.gender_id = req.body.gender_id !== undefined ? req.body.gender_id : user.gender_id;

            const updateResult = await sql.query`
                UPDATE [user]
                SET [firstname] = ${user.firstname},[nickname] = ${user.nickname},[lastname] = ${user.lastname},
                    [address] = ${user.address},[zipcode] = ${user.zipcode},[country] = ${user.country},
                    [city] = ${user.city},[ssn] = ${user.ssn},[profession] = ${user.profession},
                    [email] = ${user.email},[phone] = ${user.phone},[barcode] = ${user.barcode},
                    [info] = ${user.info},[invitation] = ${user.invitation ? 1 : 0},[deceased] = ${user.deceased ? 1 : 0},
                    [veteran] = ${user.veteran ? 1 : 0},[gender_id] = ${user.gender_id}
                WHERE id = ${req.params.userId}
                `;
            await dbservice.close();

            if (updateResult.rowsAffected[0] == 1) {
                res.sendStatus(HttpStatus.OK);
            }
            else {
                res.sendStatus(HttpStatus.BAD_REQUEST);
            }
        }
    }

    async delete(req, res) {
        const sql = await dbservice.connect();
        const result = await sql.query`
            DELETE FROM [user]
            WHERE id = ${req.params.userId}
            `;
        await dbservice.close();
        
        if (result.rowsAffected[0] == 0) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        } else {
            res.sendStatus(HttpStatus.OK);
        }
    }

    async getPicture(req, res) {
        console.log(`get picture for userId: ${req.params.userId}`);
        // TODO sql query for picture missing

        res.json({ picture: "0xfe234ead738f8c8a27e1fa2", picturedate: moment.utc().format() });
    }

    async storePicture(req, res) {
        console.log(`store picture for userId: ${req.params.userId}`);
        // TODO sql update for picture missing

        // let picturedate = req.body.picturedate;
        // if (req.body.picture != null && (picturedate == null || picturedate == undefined)) {
        //     picturedate = moment.utc().format();
        //     console.log(picturedate);
        // }

        res.sendStatus(HttpStatus.OK);
    }

    async createLogin(req, res) {
        const sql = await dbservice.connect();
        const result = await sql.query`
            SELECT *
            FROM [login]
            WHERE user_id = ${req.params.userId} OR username = ${req.body.username}
            `;

        if (result.recordset.length != 0) {
            // username exists or user has already login created
            await dbservice.close();
            res.sendStatus(HttpStatus.CONFLICT);
        } else {
            console.log("body", req.body);
            console.log("config", config);
            const passwordHash = await bcrypt.hash(req.body.password, config.common.passwordSaltRounds);
            const insertResult = await sql.query`
                INSERT INTO [login]
                    ([username],[password],[user_id],[group_id])
                VALUES
                    (${req.body.username},${passwordHash},${req.params.userId},${req.body.group_id})
                `;
            await dbservice.close();

            if (insertResult.rowsAffected[0] == 0) {
                res.sendStatus(HttpStatus.BAD_REQUEST);
            } else {
                res.sendStatus(HttpStatus.CREATED);
            }
        }
    }

    async getLogin(req, res) {
        const sql = await dbservice.connect();
        // select all but password
        const result = await sql.query`
            SELECT [id],[username],[lastlogin],[user_id],[group_id]
            FROM [login]
            WHERE user_id = ${req.params.userId}
            `;
        await dbservice.close();

        if (result.recordset.length == 0) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        } else {
            res.json(result.recordset[0]);
        }
    }
}

module.exports = new UserController();