const { createGzip, createDeflate } = require('zlib');

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){

    return rs;
  }else if(/\bgzip\b/.test(acceptEncoding)){
    res.setHeader('Content-Encoding', 'gzip');
    return rs.pipe(createGzip());
  }else if(/\bdeflate\b/.test(acceptEncoding)){

    res.setHeader('Content-Encoding', 'deflate');
    return rs.pipe(createDeflate());
  }
}
