import React, { createContext, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [input, setInput] = useState({
    name: "",
    description: "",
    category: "",
    release_year: 2007,
    size: 0,
    price: 0,
    rating: 0,
    image_url: "",
    is_android_app: 0,
    is_ios_app: 0,
  });

  const [fetchStatus, setFetchStatus] = useState(true);
  const [currentId, setCurrentId] = useState(-1);

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      description,
      category,
      release_year,
      size,
      price,
      rating,
      image_url,
      is_android_app,
      is_ios_app,
    } = input;

    const requestData = {
      name,
      description,
      category,
      release_year: parseInt(release_year),
      size: parseInt(size),
      price: parseInt(price),
      rating: parseInt(rating),
      image_url,
      is_android_app: parseInt(is_android_app),
      is_ios_app: parseInt(is_ios_app),
    };

    if (currentId === -1) {
        axios
          .post('https://backendexample.sanbercloud.com/api/mobile-apps', requestData)
          .then((res) => {
            swal('Success', 'Data has been created!', 'success');
            setFetchStatus(true);
          })
          .then(() => {
            navigate('/manage-data');
          });
      } else {
      axios
        .put(
          `https://backendexample.sanbercloud.com/api/mobile-apps/${currentId}`,
          requestData
        )
        .then((res) => {
          swal('Success', 'Data has been updated!', 'success');
          setFetchStatus(true);
        })
        .then(() => {
            navigate('/manage-data');
          });
        ;
    }

    setCurrentId(-1);

    setInput({
      name: "",
      description: "",
      category: "",
      release_year: 2007,
      size: 0,
      price: 0,
      rating: 0,
      image_url: "",
      is_android_app: 0,
      is_ios_app: 0,
    });
  };

  const handleDelete = (event) => {
    const idData = parseInt(event.target.value);

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://backendexample.sanbercloud.com/api/mobile-apps/${idData}`
          )
          .then((res) => {
            swal('Success', 'Data has been deleted!', 'success');
            setFetchStatus(true);
          });
      }
    });
  };

  const handleEdit = (event) => {
    const idData = parseInt(event.target.value);

    setCurrentId(idData);

    axios
      .get(`https://backendexample.sanbercloud.com/api/mobile-apps/${idData}`)
      .then((res) => {
        const data = res.data;

        setInput({
          name: data.name,
          description: data.description,
          category: data.category,
          release_year: data.release_year,
          size: data.size,
          price: data.price,
          rating: data.rating,
          image_url: data.image_url,
          is_android_app: data.is_android_app,
          is_ios_app: data.is_ios_app,
        });
      });

    navigate(`manage-data/edit/${idData}`);
  };

  const handlePlatformChange = (e) => {
    const { name, checked } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: checked ? 1 : 0,
    }));
  };

  // Convert size from MB to GB
  const convertSize = (sizeInMB) => {
    if (!sizeInMB) {
      return '0 MB';
    }
  
    if (sizeInMB < 1024) {
      return sizeInMB + ' MB';
    } else {
      const sizeInGB = (sizeInMB / 1024).toFixed(2);
      return sizeInGB + ' GB';
    }
  };  

  /* Fungsi formatRupiah */
  function formatRupiah(angka, prefix) {
    if (angka === '0') {
      return 'Free';
    }
  
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
  
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  }

  // Render stars based on the rating
  function renderStars(rating) {
    const starCount = 5;
    const fullStar = '★';
    const emptyStar = '☆';

    let stars = '';
    for (let i = 1; i <= starCount; i++) {
      stars += i <= rating ? fullStar : emptyStar;
    }

    return stars;
  }

  const handleText = (text, max) => {
    if (text === null) {
      return '';
    } else if (text.length > 10) {
      return text.slice(0, max) + '...';
    } else {
      return text;
    }
  };

  let state = {
    data,
    setData,
    input,
    setInput,
    fetchStatus,
    setFetchStatus,
    currentId,
    setCurrentId,
  };

  let handleFunctions = {
    handleEdit,
    handleDelete,
    handleSubmit,
    handleInput,
    handlePlatformChange,
    convertSize,
    formatRupiah,
    renderStars,
    handleText,
  };

  return (
    <GlobalContext.Provider value={{ state, handleFunctions }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;