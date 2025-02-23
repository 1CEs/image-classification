FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bunx --bun vite build

EXPOSE 1234

CMD ["bun", "vite", "--host", "--port", "1234"]