'use strict';

const Controller = require('../core/base_control');

class HomeController extends Controller {
  async index() {
    console.log(process.env);

    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
