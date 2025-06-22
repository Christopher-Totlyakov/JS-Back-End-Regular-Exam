import express from 'express'
import routes from './routes.js';
import handlebars from 'express-handlebars'
import initDatabase from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/authMiddlewares.js';

const app = express();

initDatabase()

app.use(express.static('src/public'));

app.use(cookieParser())

app.use(express.urlencoded());

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
        // allowedProtoMethods:{ security
        //     'getAll': true
        // }
    },
    helpers:{
        setTitle(title) {
            this.pageTitle = title;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(auth);

app.use(routes);

app.listen(3000,() => console.log('server is listening on http://localhost:3000'));