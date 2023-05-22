import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import Fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import fastifySecureSession from "@fastify/secure-session";

const port = process.env.PORT || 4501;
const env = process.env.NODE_ENV || "production";

console.log(env);

const fastify = Fastify({
	logger: false,
	trustProxy: true,
	https: {
		key: fs.readFileSync(process.cwd() + "/localhost-key.pem"),
		cert: fs.readFileSync(process.cwd() + "/localhost-cert.pem"),
	},
});

fastify.register(helmet, { contentSecurityPolicy: false, crossOriginEmbedderPolicy: false });

fastify.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
		return;
	},
});

fastify.register(fastifyCookie);

fastify.register(fastifySecureSession, {
	key: fs.readFileSync(process.cwd() + "/secret_key.b"),
	cookie: {
		path: "/",
		domain: "localhost",
		secure: true,
		maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
	},
	saveUninitialized: false,
});

const startServer = async () => {
	try {
		await fastify.listen({ port });

		console.info(`HTTPS server running on https://localhost:${port} [${env}]`);
	} catch (e) {
		console.log(e);
	}
};

startServer();

export default fastify;
