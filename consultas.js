const { Pool } = require("pg");

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'likeme',
    password: '3022',
    port: 5432,
}

const pool = new Pool(config);

const guardarPost = async (post) => {
    const values = Object.values(post);
    const consulta = {
        text: "insert into posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0)",
        values,
    }
    const result = await pool.query(consulta);
    return result;
};

const getPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
}

const like = async (id) => {
    const result = pool.query(`update posts set likes = likes + 1 where id = ${id} returning *`);
    return (await result).rows;
}



module.exports = { guardarPost, getPosts, like };
