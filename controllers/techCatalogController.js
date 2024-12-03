const db = require("../config/db");

const addCatalog = async (req, res) => {
  const { name, description, video, created_by, updated_by } = req.body;

  // validation
  if (!name || !description || !video || !created_by || !updated_by) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const query = `INSERT INTO tech_catalog (name, description, video, created_by, created_at, updated_by, updated_at) VALUES (?, ?, ?, ?, NOW(), ?, NOW())`;

    const [result] = await db.query(query, [
      name,
      description,
      video,
      created_by,
      updated_by,
    ]);
    res.status(201).json({
      success: true,
      data: result,
      message: "Catalog added successfully",
    });
  } catch (error) {
    console.error("Error adding catalog");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getOrfindCatalog = async (req, res) => {
  const { search } = req.query;

  try {
    let query = `SELECT * FROM tech_catalog`;
    const values = [];

    if (search) {
      query += ` WHERE name LIKE ? OR description LIKE ?`;
      values.push(`%${search}%`, `%${search}%`);
    }
    const [result] = await db.query(query, values);

    // course not found
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No catalog found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: search ? "Find catalog success" : "Get catalog success",
    });
  } catch (error) {
    console.error("Error find catalog", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateCatalog = async (req, res) => {
  const { id } = req.params;
  const { name, description, video, updated_by, updated_at } = req.body;

  // check if catalog exist
  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: "Catalog id not found" });
  }

  // make sure not all of the fields is empty
  if (!name && !description && !video && !updated_by && updated_at) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are empty" });
  }

  try {
    let query = "UPDATE tech_catalog SET ";
    const fields = [];
    const values = [];
    if (name) {
      fields.push("name = ?");
      values.push(name);
    } else if (description) {
      fields.push("description = ?");
      values.push(description);
    } else if (video) {
      fields.push("video = ?");
      values.push(video);
    } else if (updated_by) {
      fields.push("updated_by = ?");
      values.push(updated_by);
    } else if (updated_at) {
      fields.push("updated_at = ?");
      values.push(updated_at);
    }

    fields.push("updated_at = NOW() "); // update the updated_at fields in database
    query += fields.join(", ") + `WHERE id = ?`;
    values.push(id); // add the id from req.params.id

    const [result] = await db.query(query, values);

    // check if there's any course
    if (result.affectedRows == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Catalog not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Catalog successfully updated",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error updating catalog", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getCatalogById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `SELECT * FROM tech_catalog WHERE id = ?`;
    const [result] = await db.query(query, [id]);

    // check if there's any course
    if (result.affectedRows == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Catalog not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Get catalog by id success",
    });
  } catch (error) {
    console.error("Error get catalog by id", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteCatalog = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM tech_catalog WHERE id = ?`;
    const [result] = await db.query(query, [id]);

    if (result.affectedRows == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Catalog id not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Catalog deleted successfully" });
  } catch (error) {
    console.error("Error deleting catalog", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getOrfindCatalog,
  addCatalog,
  updateCatalog,
  getCatalogById,
  deleteCatalog,
};
