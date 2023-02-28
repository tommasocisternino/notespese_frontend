FROM node
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
COPY .env.example .env
EXPOSE 3000
CMD ["npm" ,"start"]