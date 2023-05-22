import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import Fastify from "fastify";
import fastifySecureSession from "@fastify/secure-session";
import fs from "fs";

const port = process.env.PORT || 4501;
const env = process.env.NODE_ENV || "production";

const fastify = Fastify({
	logger: false,
	trustProxy: true,
	https: {
		key: fs.readFileSync(process.cwd() + "/certs/localhost-key.pem"),
		cert: fs.readFileSync(process.cwd() + "/certs/localhost-cert.pem"),
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
