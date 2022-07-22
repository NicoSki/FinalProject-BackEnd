let express = require("express");
let { config } = require("./config");
let path = require("path");
let cors = require("cors");
const engine = require("ejs-mate");
let serverRoutes = require("./routes");
let morgan = require("morgan");
let mongoDB = require("./config/database/mongoDB");
let {logger} = require("./utils/pino");

//*CLUSTER:
let cluster = require("cluster");
let numCpus = require("os").cpus().length;

//*PASSPORT
const passport = require("passport");
const session = require("express-session");
require("./utils/passport/local-auth");

//*FLASH
const flash = require("connect-flash");


class Server {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.secret = config.passSecret;
        this.settings();
        this.views();
        this.middleware();
        this.routes();
    }

    settings() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "/public"));
    }

    views() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.engine("ejs", engine);
        this.app.set("view engine", "ejs");
    }

    middleware() {
        this.app.use(cors('*'));
        this.app.use(morgan('tiny'));
        this.app.use(session({
            secret: this.secret,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(flash());
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        //*GLOBAL VARS(Message)
        this.app.use((req, res, next) => {
            this.app.locals.errorMessage = req.flash("errorMessage");
            this.app.locals.user = req.user;
            next();
        })
    }

    routes() {
        serverRoutes(this.app);
    }

    init() {
        if (cluster.isMaster) {
            logger.warn(`Master PID --> ${process.pid}`);

            //*WORKERS
            for (let i = 0; i < numCpus; i++) {
                cluster.fork();
            }


            cluster.on("exit", (worker, code, signal) => {
                logger.warn(`The subprocess ${worker.process.pid} has died`);
                cluster.fork();
            });
        } else {
            this.app.listen(this.port, () => { logger.info(`Server on http://localhost:${this.port} || Worker: ${process.pid}`) });
        }
    }
}

module.exports = new Server();