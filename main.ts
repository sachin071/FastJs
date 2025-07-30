import fastify from 'fastify';
import { registerControllers } from './Integrater/index.ts';

const app = fastify({ logger: false });

async function setupServer() {
    await registerControllers(app);
}
await setupServer();


app.listen({ port: 3000 }, (err: any, address: any) => {
    if (err) {
        app.log.error(err);
    }
    console.log(`Server running`);
});