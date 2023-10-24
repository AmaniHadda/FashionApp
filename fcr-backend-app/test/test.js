let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let user = require("../models/userModel");
chai.should();

chai.use(chaiHttp);
var requester = chai.request("http://localhost:5000").keepOpen();

it(" It should GET all the users", () => {
  requester.get("/user/all_infor/").end((err, response) => {
    response.should.have.status(201);
    response.body.should.be.a("array");

    response.body.length.should.be.eq(3);
  });
});

it("It should get a user by Id", () => {
  const _id = "6405f8d02a21f44804b07477";

  requester.get("/user/getuser/" + _id).end((err, response) => {
    response.body.should.have.status(201);
    response.body.should.be.a("object");
  });
});

it("It should Post a new user", () => {
  const user = {
    name: "wassym",
    completed: false,
  };
  requester
    .post("/user/register")
    .send(user)
    .end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq(4);
      response.body.should.have.property("name").eq("wassym");
      response.body.should.have.property("completed").eq(false);
    });
});

it("It should Patch a new user", () => {
  const _id = "6405f8d02a21f44804b07477";
  const user = {
    name: "wassym jaffel changed",
    completed: true,
  };
  requester
    .post("/user/updateuser/" + _id)
    .send(user)
    .end((err, response) => {
      response.should.have.status(201);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq("6405f8d02a21f44804b07477");
      response.body.should.have.property("name").eq("wassym jaffel changed");
      response.body.should.have.property("completed").eq(true);
    });
});
