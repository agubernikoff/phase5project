import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Loading from "./Loading";

function ListAProduct({ user, updateProductsOnNewListing }) {
  const forSaleProjects = user.projects.filter(
    (project) => project.status === "For Sale"
  );
  const [project_id, setProjectId] = useState(forSaleProjects[0].id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [xs, setXS] = useState(0);
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);
  const [xl, setXL] = useState(0);
  const [xxl, setXXL] = useState(0);
  const [oneSizeFitsAll, setOneSizeFitsAll] = useState(0);
  const [main_image, setMainImage] = useState("");
  const [images, setImages] = useState([]);
  const [color, setColor] = useState("#ffffff");
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displaySizes, setDisplaySizes] = useState(true);
  const navigate = useNavigate();

  const projectOptions = forSaleProjects.map((p) => (
    <option key={p.title} value={p.id}>
      {p.title}
    </option>
  ));

  const formData = new FormData();
  formData.append("project_id", project_id);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("xs", xs);
  formData.append("s", s);
  formData.append("m", m);
  formData.append("l", l);
  formData.append("xl", xl);
  formData.append("xxl", xxl);
  formData.append("one_size_fits_all", oneSizeFitsAll);
  formData.append("main_image", main_image);
  for (let i = 0; i < images.length; i++) {
    formData.append("images[]", images[i]);
  }
  formData.append("colors", colors);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (images.length > 10) {
      setErrors(["Too many files. Maximum allowed is 10"]);
      setIsLoading(false);
    } else if (!main_image && images.length < 1) {
      setErrors(["Please upload at least one photo"]);
      setIsLoading(false);
    } else if (colors.length === 0) {
      setErrors(["Please select at least one color"]);
      setIsLoading(false);
    } else {
      fetch("/products", {
        method: "POST",
        body: formData,
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            updateProductsOnNewListing(data);
            navigate("/");
          });
        } else {
          r.json().then((data) => {
            setErrors(data.errors);
          });
        }
      });
    }
  }

  const mappedColors = colors.map((c) => (
    <div
      key={c}
      style={{
        width: "5vw",
        height: "5vw",
        borderRadius: 100,
        border: "1px solid black",
        backgroundColor: `${c}`,
        margin: "5px",
      }}
    ></div>
  ));

  return (
    <div>
      ListAProduct
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
        }}
      >
        <label>Choose a project to post to:</label>
        <select
          onChange={(e) => {
            setProjectId(parseInt(e.target.value));
          }}
        >
          {projectOptions}
        </select>
        <br />
        <label htmlFor="username">Product name:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="title"
          autoComplete="off"
          value={price}
          min="1"
          max="100000000"
          step=".01"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <div>
          <label htmlFor="oneSizeFitsAll" style={{ width: "fit-content" }}>
            One size fits all?
          </label>
          <input
            type="checkbox"
            value={displaySizes}
            onChange={(e) => setDisplaySizes(!displaySizes)}
            style={{ display: "inline", width: "fit-content" }}
          />
        </div>
        <br />
        <label>Inventory by size:</label>
        {displaySizes ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <label htmlFor="price">XS: </label>
              <input
                type="number"
                id="xs"
                autoComplete="off"
                value={xs}
                min="0"
                max="99999"
                style={{ width: "fit-content", display: "inline" }}
                onChange={(e) => setXS(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="s">S: </label>
              <input
                type="number"
                id="title"
                autoComplete="off"
                value={s}
                min="0"
                max="99999"
                style={{ width: "fit-content", display: "inline" }}
                onChange={(e) => setS(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="m">M: </label>
              <input
                type="number"
                id="title"
                autoComplete="off"
                value={m}
                min="0"
                max="99999"
                style={{ width: "fit-content", display: "inline" }}
                onChange={(e) => setM(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="l">L: </label>
              <input
                type="number"
                id="title"
                autoComplete="off"
                value={l}
                min="0"
                max="99999"
                style={{ width: "fit-content", display: "inline" }}
                onChange={(e) => setL(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="xl">XL: </label>
              <input
                type="number"
                id="title"
                autoComplete="off"
                value={xl}
                min="0"
                max="99999"
                style={{ width: "fit-content", display: "inline" }}
                onChange={(e) => setXL(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="xxl">XXL: </label>
              <input
                type="number"
                id="title"
                autoComplete="off"
                value={xxl}
                min="0"
                max="99999"
                style={{ width: "fit-content", display: "inline" }}
                onChange={(e) => setXXL(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="one size fits all">One Size Fits All: </label>
            <input
              type="number"
              id="title"
              autoComplete="off"
              value={oneSizeFitsAll}
              min="0"
              max="99999"
              style={{ width: "fit-content", display: "inline" }}
              onChange={(e) => setOneSizeFitsAll(e.target.value)}
            />
          </div>
        )}
        <br />
        <label htmlFor="caption">Description:</label>
        <textarea
          type="text"
          id="description"
          autoComplete="off"
          rows="10"
          cols="75"
          placeholder="Tell us about your product"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <div>
          <label htmlFor="main_image">Main Image:</label>
          <em
            style={{
              border: "1px solid grey",
              color: "grey",
              borderRadius: 10,
              width: 10,
              textAlign: "center",
              margin: 5,
            }}
          >
            This image will be used as a preview for your product
          </em>
        </div>
        <input
          type="file"
          accept=".jpeg,.png"
          name="files"
          onChange={(e) => setMainImage(e.target.files[0])}
        ></input>
        <br />
        <label htmlFor="images">Upload product images:</label>
        <input
          type="file"
          accept=".jpeg,.png"
          name="files"
          multiple
          onChange={(e) => setImages(e.target.files)}
        ></input>
        <br />
        <label>Colors:</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              alignItems: "center",
            }}
          >
            <p>Select which colors your product is offered in:</p>
            <HexColorPicker color={color} onChange={setColor} />
            <HexColorInput color={color} onChange={setColor} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!colors.includes(color)) setColors([...colors, color]);
                else setErrors(["Please select a new color."]);
              }}
            >
              SELECT A COLOR
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {mappedColors}
          </div>
        </div>
        <br />
        <button variant="fill" type="submit" style={{ marginTop: 10 }}>
          {isLoading ? <Loading /> : "SUBMIT"}
        </button>
        {errors.map((err) => (
          <h3
            key={err}
            style={{
              display: "block",
              margin: "auto",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {err}
          </h3>
        ))}
      </form>
    </div>
  );
}

export default ListAProduct;
