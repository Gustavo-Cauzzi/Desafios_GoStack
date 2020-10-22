const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');
const { isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function validateId(req,res,next){
  const { id } = req.params;

  if(!isUuid(id)){
    return res.status(400).json({error:"Invalid project ID"});
  }

  return next();
}

app.use('/repositories/:id',validateId);

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.status(200).json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title , url , techs } = req.body;

  const repo = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0
  }
  
  repositories.push(repo);

  return res.json(repo).status(204);
});

app.put("/repositories/:id", (req, res) => {
  const { title , url , techs } = req.body;
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(
    repository => repository.id == id
  );

  const repo ={
    id,
    title,
    url,
    techs,
    likes:repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repo;

  return res.json(repo).status(200);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(
    repository => repository.id == id
  );
  
  repositories.splice(repositoryIndex,1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(
    repository => repository.id == id
  );

  repositories[repositoryIndex].likes++;

  return res.json(repositories[repositoryIndex]).status(200);
});

module.exports = app;
