const express = require('express');
const router = express.Router();

const requireDir = require('require-dir');
const dir = requireDir('./');

Object.keys(dir).forEach(x => dir[x](router));

module.exports = router;