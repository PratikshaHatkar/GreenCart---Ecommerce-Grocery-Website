import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { categories } from "../../assets/assets";

const EditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { axios } = useAppContext();


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");


    // ===========================
    // Get Product
    // ===========================

    const fetchProduct = async () => {
        try {
            const { data } = await axios.post(
                "/api/product/id",
                {
                    id
                }
            );

            if (data.success) {

                const product = data.product;

                setName(product.name);

                setDescription(
                    product.description.join("\n")
                );

                setCategory(product.category);

                setPrice(product.price);

                setOfferPrice(product.offerPrice);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(error.message);

        }
    };


    useEffect(() => {

        fetchProduct();

    }, [id]);


    // ===========================
    // Update Product
    // ===========================

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const productData = {

                name,

                description: description.split("\n"),

                category,

                price,

                offerPrice

            };


            const { data } = await axios.put(
                `/api/product/update/${id}`,
                productData
            );


            if (data.success) {

                toast.success(data.message);

                navigate("/farmer/product-list");

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            toast.error(error.message);

        }

    };


    return (

        <div className="flex-1 h-[95vh] overflow-y-scroll">

            <div className="w-full md:p-10 p-4">

                <h2 className="pb-5 text-lg font-medium">
                    Edit Product
                </h2>


                <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-5 max-w-xl"
                >

                    {/* Name */}

                    <div className="flex flex-col gap-1">

                        <label>
                            Product Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            type="text"
                            className="outline-none py-2.5 px-3 rounded border border-gray-500/40"
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="flex flex-col gap-1">

                        <label>
                            Product Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows={4}
                            className="outline-none py-2.5 px-3 rounded border border-gray-500/40 resize-none"
                        />

                    </div>


                    {/* Category */}

                    <div className="flex flex-col gap-1">

                        <label>
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className="outline-none py-2.5 px-3 rounded border border-gray-500/40"
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map((item, index) => (

                                <option
                                    key={index}
                                    value={item.path}
                                >
                                    {item.path}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Price */}

                    <div className="flex gap-5">

                        <div className="flex-1">

                            <label>
                                Product Price
                            </label>

                            <input
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }
                                type="number"
                                className="w-full outline-none py-2.5 px-3 rounded border border-gray-500/40"
                                required
                            />

                        </div>


                        <div className="flex-1">

                            <label>
                                Offer Price
                            </label>

                            <input
                                value={offerPrice}
                                onChange={(e) =>
                                    setOfferPrice(e.target.value)
                                }
                                type="number"
                                className="w-full outline-none py-2.5 px-3 rounded border border-gray-500/40"
                                required
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="px-8 py-2.5 bg-primary text-white font-medium rounded"
                    >
                        UPDATE
                    </button>

                </form>

            </div>

        </div>

    );
};

export default EditProduct;