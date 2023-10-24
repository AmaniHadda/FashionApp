import { useTheme } from '@mui/material/styles';
import { Alert, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, NativeSelect, OutlinedInput, Rating, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import { FaTrash } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { format } from 'date-fns';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function DetailUpdate({ id, openUpdate, onClose, getHabillements }) {
    const [name, setName] = useState("");
    const [hbImg, sethbImg] = useState([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState("");
    const [imgH, setImgH] = useState("");
    const [subcategoryName, setSubcategoryName] = useState("");
    const [seasonName, setSeasonName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [etatdepot, setetatDepot] = useState("");
    const [proprietaire, setProprietaire] = useState("");
    const [dateDepot, setDateDepot] = useState("");
    const [dateEffectifRamacage, setdateEffectifRamacage] = useState("");
    const [lieu, setLieu] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [Brands, setBrands] = useState([]);
    const [Seasons, setSeasons] = useState([]);
    const [sizes, setSizesArray] = useState([]);
    const [shoesizes, setShoeSizesArray] = useState([]);
    const [parrains, setParrains] = useState([]);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingImg, setIsEditingImg] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [isEditingsubcategory, setIsEditingsubcategory] = useState(false);
    const [isEditingseason, setIsEditingseason] = useState(false);
    const [isEditingbrand, setIsEditingbrand] = useState(false);
    const [isEditingshoes, setIsEditingshoes] = useState(false);
    const [isEditingsizes, setIsEditingsizes] = useState(false);
    const [isEditinglieu, setIsEditinglieu] = useState(false);
    const [isEditingdatedepot, setIsEditingdatedepot] = useState(false);
    const [isEditingdateramacage, setIsEditingdateramacage] = useState(false);
    const [isEditingproprietaire, setIsEditingproprietaire] = useState(false);
    const [isEditingEtat, setIsEditingEtat] = useState(false);
    const [qualite, setQualite] = React.useState(0);
    const [marque, setMarque] = React.useState(0);
    const [tendance, setTendance] = React.useState(0);
    const [rarete, setRarete] = React.useState(0);
    const [Sizes, setSizes] = useState([]);
    const [InfoShow, setInfoShow] = useState(true);
    const [shoesSizes, setShoeSizes] = useState([]); //bd
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);// update
    const [sizesName, setSizesName] = React.useState([]);// update
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [sousImages, setSousImages] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(personName)
    };
    const handleChangeSizes = (event) => {
        const {
            target: { value },
        } = event;
        setSizesName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(sizesName)
    };
    const deleteSelectedImage = async () => {
        try {
            if (selectedImageId) {
                if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
                    const response = await axios.delete(
                        ` /hbs/images/delete/${selectedImageId}`
                    );
                    toast.success("Image supprimée avec succès", {
                        className: "toast-success",
                        bodyClassName: "toast-success",
                    });

                    // Step 2: Check if the main image is deleted and set selectedImageId accordingly
                    if (sousImages.some((item) => item._id === selectedImageId && item.isMainImage)) {
                        setSelectedImageId(null);
                    }

                    // Reload the sous images after deletion
                    const updatedSousImages = sousImages.filter(
                        (sousImage) => sousImage._id !== selectedImageId
                    );
                    setSousImages(updatedSousImages);
                }
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error("Erreur lors de la suppression de l'image");
        }
    };
    useEffect(() => {
        getHabillementById()
        fetchBrands();
        fetchSubcategories();
        fetchSeasons();
        fetchSizes();
        fetchShoeSizes();
        getSousImagesByHabillement();
        fetchParrains();
        sousImages.map(e => console.log(e.hbImg))
        setTimeout(() => {
            setInfoShow(false)
        }, 5000);
    }, [openUpdate])
    const getSousImagesByHabillement = async () => {
        try {
            const response = await axios.get(` /habillements/getsousimages/${id}`);
            setSousImages(response.data);
            console.log(response.data)

        } catch (error) {
            console.error('Error retrieving sous images by habillement:', error);
            throw error;
        }
    };
    const handleUpdate = async () => {
        const currentDate = new Date();
        const today = format(currentDate, 'yyyy-MM-dd');
        if (!name || !description || !price || !sizesName || !personName || !dateDepot||!dateEffectifRamacage ) {
        return toast.error("Veuillez remplir tous les champs s'il vous plait .");
        }
        if (dateEffectifRamacage <dateDepot) {
        return toast.error("Date effectif du ramaçage doit étre supérieure à date du dépot d'aujourd'hui .");
        }
        try {
           
            const currentHabillementResponse = await axios.get(
                ` /habillements/retrieve/${id}`
            );
            const currentHabillement = currentHabillementResponse.data.data;
            const totalSousImages = currentHabillement.sousImages
                ? currentHabillement.sousImages.length
                : 0;
            const newSousImagesCount = hbImg.length;
            const combinedSousImagesCount = totalSousImages + newSousImagesCount;
            if (combinedSousImagesCount > 4) {
                toast.error("Un habillement ne peut pas avoir plus de 3 sous images.");
                return;
            }
            const personNameJSON = JSON.stringify(personName);
            const sizesNameJSON = JSON.stringify(sizesName);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("img", img);
            formData.append("subcategoryName", subcategoryName);
            formData.append("seasonName", seasonName);
            formData.append("brandName", brandName);
            formData.append("sizes", sizesNameJSON);
            formData.append("shoesizes", personNameJSON);
            formData.append("isNew_", isNew);
            formData.append("proprietaire",proprietaire);
            formData.append("dateDepot", dateDepot);
            formData.append("dateEffectifRamacage", dateEffectifRamacage);
            formData.append("lieu", lieu);
            formData.append("qualite", qualite);
            formData.append("marque", marque);
            formData.append("tendance", tendance);
            formData.append("rarete", rarete);
            const response = await axios.put(
                ` /habillements/update/${id}`,
                formData
            );

            // Handle adding new sous images
            for (const file of hbImg) {
                const imageFormData = new FormData();
                imageFormData.append("hbImg", file);
                await axios.post(
                    ` /hbs/images/add/${name}`,
                    imageFormData
                );
            }

            console.log(response.data);
            toast.success("habillement modifié avec succès");
            onClose();
            getHabillements();
        } catch (error) {
            console.error("Error updating habillement:", error);
            toast.error("Erreur de modification d'habillement");
        }
    };
    const fetchSizes = async () => {
        try {
            const response = await axios.get(
                " /habillements/getSizes"
            );
            setSizes(response.data);
        } catch (error) {
            console.log("Error fetching sizes:", error);
        }
    };
    const fetchShoeSizes = async () => {
        try {
            const response = await axios.get(
                " /habillements/getShoeSizes"
            );
            setShoeSizes(response.data);
        } catch (error) {
            console.log("Error fetching getShoeSizes", error);
        }
    };
    const fetchParrains = async () => {
        try {
            const response = await axios.get(
                " /parrain/retrieveParrain"
            );
            setParrains(response.data.data);
        } catch (error) {
            console.log("Error fetching parrains", error);
        }
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
        }
    };
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setIsNew(checked,
        );
    };
    const handleSousImageChange = (event) => {
        const files = Array.from(event.target.files);
        sethbImg((prevHbImg) => [...prevHbImg, ...files]);
        console.log(hbImg);
    };
    const handleSubcategoryNameChange = (e) => {
        setSubcategoryName(e.target.value);
    };
    const handleSeasonNameChange = (e) => {
        setSeasonName(e.target.value);
    };
    const handleBrandNameChange = (e) => {
        setBrandName(e.target.value);
    };
    const fetchSubcategories = async () => {
        try {
            const response = await axios.get(
                " /habillements/getsubcategory"
            );
            setSubcategories(response.data);
        } catch (error) {
            console.log("Error fetching subcategories:", error);
        }
    };
    const fetchBrands = async () => {
        try {
            const response = await axios.get(
                " /habillements/getbrand"
            );
            setBrands(response.data);
        } catch (error) {
            console.log("Error fetching subcategories:", error);
        }
    };
    const fetchSeasons = async () => {
        try {
            const response = await axios.get(
                " /habillements/getseason"
            );
            setSeasons(response.data);
        } catch (error) {
            console.log("Error fetching subcategories:", error);
        }
    };
    const getHabillementById = async () => {
        const res = await axios.get(` /habillements/retrieve/${id}`).then(
            response => {
                setName(response.data.data.name);
                setDescription(response.data.data.description)
                setPrice(response.data.data.price)
                setImgH(response.data.data.img)
                setSubcategoryName(response.data.data.subcategoryFK?.name)
                setSeasonName(response.data.data.seasonFK?.name)
                setBrandName(response.data.data.brandFK?.name)
                setShoeSizesArray(response.data.data.shoesizes)
                setSizesArray(response.data.data.sizes)
                setIsNew(response.data.data.isNew_)
                setetatDepot(response.data.data.etatDepot?.etat)
                setQualite(response.data.data.etatDepot?.qualite)
                setMarque(response.data.data.etatDepot?.marque)
                setTendance(response.data.data.etatDepot?.tendance)
                setRarete(response.data.data.etatDepot?.rarete)
                setDateDepot(response.data.data.dateDepot)
                setdateEffectifRamacage(response.data.data.dateEffectifRamacage)
                setLieu(response.data.data.lieu)
                setProprietaire(response.data.data.proprietaire?.email)
            }
        ).catch(err => console.log(err));
    };
    return (
        <Dialog
            open={true}
            onClose={() => { onClose(); setIsEditingDesc(false); setIsEditingImg(false); setIsEditingName(false); setIsEditingPrice(false); setIsEditingbrand(false); setIsEditingseason(false); setIsEditingshoes(false); setIsEditingsizes(false); setIsEditingsubcategory(false) }}
            maxWidth="sm"
            fullWidth
        >
            <ToastContainer />
            <DialogTitle style={{ color: "#ec407a", fontSize: "30px" }}>Modifier habillement</DialogTitle>
            <DialogContent>
                {InfoShow && <Stack sx={{ width: '100%', marginTop: "15px", marginBottom: "10px" }} spacing={2}>
                    <Alert severity="info">Clique simplement sur l'élément et effectue les modifications souhaitées. !</Alert>
                </Stack>}
                <div className="container mt-5 pt-5">
                    <div className="product-box row" data-aos="fade-left">
                        <div className="col-lg-6 col-md-8 col-sm-12 mx-5" style={{ marginLeft: "100px" }}>
                            <Carousel
                                width={300}

                                useKeyboardArrows={true}
                                infiniteLoop={true}
                                emulateTouch={true}
                                dynamicHeight={true}
                                showArrows={false}
                                selectedItem={selectedImageId !== null ? sousImages.findIndex((item) => item._id === selectedImageId) + 1 : 0} // Step 1: Add +1 to the index
                                onChange={(index) => setSelectedImageId(index === 0 ? null : sousImages[index - 1]?._id)} // Step 1: Subtract 1 from the index
                            >
                                <div onClick={() => setIsEditingImg(true)}>
                                    <img
                                        src={` ${process.env.REACT_APP_URL_UPLOAD}habillements/${imgH}`}
                                        alt=""

                                    />
                                </div>
                                {sousImages.map((sousImage) => (
                                    <div className="container" style={{ height: "20px" }} key={sousImage._id}>
                                        <img
                                            src={` ${process.env.REACT_APP_URL_UPLOAD}habillements/hb_images/${sousImage.hbImg}`}
                                            alt={sousImage.hbImg}
                                        />

                                    </div>
                                ))}

                            </Carousel>
                            {selectedImageId && (
                                <button onClick={deleteSelectedImage} style={{ height: "20px", color: "#e68181", cursor: "pointer" }}>
                                    Supprimer la sous image sélectionnée <FaTrash />
                                </button>
                            )}
                        </div>

                    </div>
                </div>
                {isEditingImg && <div>
                    <label>Image principale</label>
                    <div className="form-group">
                        <input
                            type="file"
                            style={{ width: "540px", height: "50px" }}
                            name="habillementImage"
                            accept="image/*"
                            onChange={handleImgChange}
                            className="form-control-file"
                        /></div>
                    <div><label>Sous-Images(maximum 3)</label>
                        <div className="form-group">
                            <input
                                multiple
                                type="file"
                                name="habillementSousImage"
                                style={{ width: "540px", height: "50px" }}
                                onChange={handleSousImageChange}
                                className="form-control-file"
                            />
                        </div></div>
                </div>
                }
                <div onClick={() => setIsEditingName(true)}>
                    {!isEditingName && <div><strong>Nom de l'habillement :</strong>{name}</div>}
                    {isEditingName && <div>
                        <div>
                            <TextField
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                label="Nom de l'article"
                                required
                                fullWidth
                                className="form-control"
                            />
                        </div>
                    </div>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingproprietaire(true)}>
                    {!isEditingproprietaire && <div><strong>Proprietaire :</strong>{proprietaire}</div>}
                    {isEditingproprietaire && <div>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Propriétaire</InputLabel>
                                <Select
                                    id="proprietaire"
                                    name="proprietaire"
                                    defaultValue={proprietaire}
                                    onChange={(e)=>setProprietaire(e.target.value)}
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    label="Propriétaire"
                                    required
                                    className="form-control"
                                >
                                    {parrains.map((p) => (
                                        <MenuItem key={p._id} value={p.email}>
                                            {p.email}
                                        </MenuItem>
                                    ))}
                                </Select></FormControl>
                        </div>
                    </div>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingbrand(true)}>
                    {!isEditingbrand && <div><strong>Marque :</strong>{brandName}</div>}
                    {isEditingbrand && <div>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Marque</InputLabel>
                                <Select
                                    id="brandFK"
                                    name="brandFK"
                                    defaultValue={brandName}
                                    onChange={handleBrandNameChange}
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    label="Marque"
                                    required
                                    className="form-control"
                                >
                                    {Brands.map((brand) => (
                                        <MenuItem key={brand._id} value={brand.name}>
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select></FormControl>
                        </div>
                    </div>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingDesc(true)}>
                    {!isEditingDesc && <div><strong>Description :</strong>{description}</div>}
                    {isEditingDesc &&
                        <TextField
                            id="description"
                            name="description"
                            value={description}
                            label="Description"
                            onChange={handleDescriptionChange}
                            placeholder="Description de l'habillement"
                            required
                            multiline
                            fullWidth
                            maxRows={4}
                        ></TextField>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingPrice(true)}>
                    {!isEditingPrice && <div><strong>Prix de l'article :</strong>{price}</div>}
                    {isEditingPrice && <TextField
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Prix de l'habillement"
                        required
                        fullWidth
                        label="Prix de l'article"
                    />}
                </div>

                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingsubcategory(true)}>
                    {!isEditingsubcategory && <div><strong>Sous catégorie :</strong>{subcategoryName}</div>}
                    {isEditingsubcategory && <div><FormControl fullWidth><InputLabel id="demo">Sous catégorie</InputLabel> <Select
                        id="subcategoryFK"
                        name="subcategoryFK"
                        defaultValue={subcategoryName}
                        onChange={handleSubcategoryNameChange}
                        fullWidth
                        required
                        labelId='demo'
                        label="Sous catégorie"
                        className="form-control"
                    >
                        {subcategories.map((subcategory) => (
                            <MenuItem key={subcategory._id} value={subcategory.name}>
                                {subcategory.name}
                            </MenuItem>
                        ))}
                    </Select></FormControl></div>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingseason(true)}>
                    {!isEditingseason && <div><strong>Saison :</strong>{seasonName}</div>}
                    {isEditingseason && <FormControl fullWidth><InputLabel id="demo2">Saison</InputLabel>  <Select
                        id="seasonFK"
                        name="seasonFK"
                        defaultValue={seasonName}
                        onChange={handleSeasonNameChange}
                        fullWidth
                        labelId='demo2'
                        label="Saison"
                        required
                        className="form-control"
                    >
                        {Seasons.map((season) => (
                            <MenuItem key={season._id} value={season.name}>
                                {season.name}
                            </MenuItem>
                        ))}
                    </Select></FormControl>}
                </div>
                {subcategoryName === "chaussures" ? (<div style={{ marginTop: "12px" }} onClick={() => setIsEditingshoes(true)}>
                    {!isEditingshoes && <div style={{ display: "flex", alignItems: "center" }}><strong>Les pointures disponibles :</strong><div style={{ display: "flex", alignItems: "center" }}>{shoesizes?.map(e => <div style={{ marginLeft: "5px" }}>{e}</div>)}</div></div>
                    }
                    {isEditingshoes && <div style={{ marginTop: "10px" }}><FormControl sx={{ m: 1 }} fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Pointures disponibles</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            defaultValue={shoesizes}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Pointures disponibles" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {shoesSizes.map((a) => (
                                <MenuItem
                                    key={a._id}
                                    value={a.name}
                                    style={getStyles(a, shoesSizes, theme)}
                                >
                                    {a.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </div>} </div>) :
                    (<div style={{ marginTop: "12px" }} onClick={() => setIsEditingsizes(true)}>
                        {!isEditingsizes && <div style={{ display: "flex", alignItems: "center" }}> <strong>Les tailles :</strong><div style={{ display: "flex", alignItems: "center" }}>{sizes?.map(e => <div style={{ marginLeft: "5px" }}>{e}</div>)}</div></div>
                        }
                        {isEditingsizes && <div style={{ marginTop: "10px" }}><FormControl fullWidth>
                            <InputLabel id="demo-multiple-chip-label">Tailles disponibles</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                defaultValue={sizes}
                                onChange={handleChangeSizes}
                                input={<OutlinedInput id="select-multiple-chip" label="Tailles disponibles" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {Sizes.map((a) => (
                                    <MenuItem
                                        key={a._id}
                                        value={a.name}
                                        style={getStyles(a, Sizes, theme)}
                                    >
                                        {a.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </div>}
                    </div>)}
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingdatedepot(true)}>
                    {!isEditingdatedepot && <div><strong>Date dépot de l'habillement :</strong>{dateDepot?.slice(0,10)}</div>}
                    {isEditingdatedepot && <div>
                        <div>
                            <TextField
                                type="date"
                                id="dateDepot"
                                name="dateDepot"
                                value={dateDepot?.slice(0,10)}
                                onChange={(e) => setDateDepot(e.target.value)}
                                label="Date dépot de l'article"
                                required
                                fullWidth
                                className="form-control"
                            />
                        </div>
                    </div>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingdateramacage(true)}>
                    {!isEditingdateramacage && <div><strong>Date effectif du ramaçage de l'habillement :</strong>{dateEffectifRamacage?.slice(0,10)}</div>}
                    {isEditingdateramacage && <div>
                        <div>
                            <TextField
                                type="date"
                                id="dateEffectifRamacage"
                                name="dateEffectifRamacage"
                                value={dateEffectifRamacage?.slice(0,10)}
                                onChange={(e) => setdateEffectifRamacage(e.target.value)}
                                label="Date du ramaçage de l'article"
                                required
                                fullWidth
                                className="form-control"
                            />
                        </div>
                    </div>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditinglieu(true)}>
                    {!isEditinglieu && <div><strong>Lieu :</strong>{lieu}</div>}
                    {isEditinglieu && <div>
                        <div>
                            <TextField
                                type="text"
                                id="lieu"
                                name="lieu"
                                value={lieu}
                                onChange={(e) => setLieu(e.target.value)}
                                label="Lieu"
                                required
                                fullWidth
                                className="form-control"
                            />
                        </div>
                    </div>}
                </div>
                <div style={{ marginTop: "12px" }} onClick={() => setIsEditingEtat(true)}>
                    {!isEditingEtat && <div><strong>Etat au dépot :</strong> {etatdepot + " %"}</div>}
                    {
                        isEditingEtat && (
                            <div>
                                Etat de l'habillement :
                                <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "25px" }}><strong>Qualité</strong></label>
                                    <Rating name="customized-10" style={{ color: "pink" }} defaultValue={qualite} max={10}
                                        value={qualite}
                                        onChange={(event, newValue) => {
                                            setQualite(newValue);
                                        }} />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "20px" }}><strong>Marque</strong></label>
                                    <Rating name="customized-10" style={{ color: "pink" }} defaultValue={marque} max={10}
                                        value={marque}
                                        onChange={(event, newValue) => {
                                            setMarque(newValue);
                                        }} />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "10px" }}><strong>Tendance</strong></label>
                                    <Rating name="customized-10" style={{ color: "pink" }} defaultValue={tendance} max={10}
                                        value={tendance}
                                        onChange={(event, newValue) => {
                                            setTendance(newValue);
                                        }} />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}><label style={{ marginRight: "30px" }}><strong>Rareté</strong></label>
                                    <Rating name="customized-10" style={{ color: "pink" }} defaultValue={rarete} max={10}
                                        value={rarete}
                                        onChange={(event, newValue) => {
                                            setRarete(newValue);
                                        }} />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div style={{ marginTop: "12px" }}>
                    <label><strong>Nouveau Article :</strong></label>
                    <FormControlLabel
                        control={
                            <Checkbox
                                type="checkbox"
                                id="isNew_"
                                name="isNew_"
                                checked={isNew}
                                onChange={handleCheckboxChange}
                                icon={<AiOutlineHeart />}
                                checkedIcon={<AiFillHeart color="#ec407a" />}
                            />
                        }
                    />

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose(); setIsEditingDesc(false); setIsEditingImg(false); setIsEditingName(false); setIsEditingPrice(false); setIsEditingbrand(false); setIsEditingseason(false); setIsEditingshoes(false); setIsEditingsizes(false); setIsEditingsubcategory(false) }} style={{ color: "black" }}>
                    Annuler
                </Button>
                <Button
                    onClick={handleUpdate}
                    style={{ backgroundColor: "#ec407a", color: "white" }}
                >
                    Mettre à jour
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DetailUpdate