import crudCtrl from "./crud.ctrl";
import db from "../db";

const dbValues = Object.entries(db);

const routes = dbValues.map(it => ({ name: it[0], schema: it[1] }));

function createCrudRouter(app, wsInfo) {
    for (const r of routes) {
        app.use('/api/' + r.name, crudCtrl(r, wsInfo))
    }
    
}

export default createCrudRouter;