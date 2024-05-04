import { Hono } from 'hono'
import { expensesRoutes } from './routes/expenses'

const app = new Hono()




app.route('/api/expenses', expensesRoutes)

export default app