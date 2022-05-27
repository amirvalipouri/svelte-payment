<script>
    import { onMount } from "svelte";
    import { Row, Col, Button } from "sveltestrap";
    import Input from "../../components/Input/Input.svelte";
    import BackDROP from "../../components/backDrop/BackDrop.svelte";
    import { Circle2 } from "svelte-loading-spinners";
    import { page, emailS, phoneS, nameS, familyS } from "../../store/store";

    let secretKey = "",
        textId = "",
        apiKey = "",
        getString = "",
        wallet = "",
        passPhrase = ""
    let address = "TM3VVFVBN6KqystrJ3Lv172266o1vzqFNd";
    let photoBtn = true,
        modal = false,
        btn = false,
        textIdError = false;
    let name,
        email,
        phone,
        family,
        pagee,
        success = 0;

    onMount(() => {
        nameS.subscribe((d) => (name = d));
        emailS.subscribe((d) => (email = d));
        familyS.subscribe((d) => (family = d));
        phoneS.subscribe((d) => (phone = d));
    });

    const thePlan = {
        _id: "61a28c78e1846f2f5d02b26d",
        createdAt: "2021-11-27T19:52:24.335Z",
        name: "پلن اسپات",
        video: "files/media/almas.mp4",
        channels: [
            "61a12d5329a847331b16305d",
            "61a12c4e29a847331b163053",
            "61a12c5729a847331b163054",
            "61a12c6329a847331b163055",
            "61a12c8529a847331b163056",
            "61a12c8d29a847331b163057",
            "61a12c9529a847331b163058",
            "61a12ca329a847331b163059",
            "61a20ddcef6552c254362348",
            "61a12bf929a847331b163051",
            "61a12c4129a847331b163052",
            "61b5c76b691e70bff3e0c711",
            "622633cfa32ec0331bcf9f0b",
        ],
        wallet: "TM3VVFVBN6KqystrJ3Lv172266o1vzqFNd",
        price: "49 USDT",
        qrCode: "images/WhatsApp Image 2022-03-25 at 2244391648232182691931162.jpeg",
        file: null,
    };

    const sendPhoto = (file) => {
        modal = true;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("payload", file);
        fetch(`http://95.217.81.86/api/payments/addPaymentPhoto`, {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                if (res.status < 300) {
                    res = await res.json();
                    btn = true;
                    success = 1;
                    getString = res.message;
                } else {
                    success = 2;
                }
            })
            .catch();
    };

    const payment = () => {
        fetch(`https://api.pishroopardakht.com/api/marvelpay/addpay`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phone: phone.toString(),
                email,
                name,
                family,
                txid: textId,
                image: getString,
                apikey: apiKey,
                secretkey: secretKey,
                status: 1,
                passphrase : passPhrase,
                exchange : wallet
            }),
        })
            .then(async (res) => {
                if (res.status < 300) {
                    res = await res.json();
                    console.log(res);
                    page.update((d) => (d = 2));
                } else {
                    res = await res.json();
                    console.log(res);
                    if (
                        res.message == "شماره همراه قبلا در سیستم ثبت شده است"
                    ) {
                        alert("شماره همراه قبلا در سیستم ثبت شده است");
                    } else if (
                        res.message == "تکس آیدی قبلا در سیستم ثبت شده است"
                    ) {
                        alert("تکس آیدی قبلا در سیستم ثبت شده است");
                    } else if (
                        res.message == "سکرت قبلا در سیستم ثبت شده است"
                    ) {
                        alert("سکرت قبلا در سیستم ثبت شده است");
                    } else {
                        alert("ای پی ای قبلا در سیستم ثبت شده است");
                    }
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };
</script>

{#if modal}
    <BackDROP />
    <div
        class="d-flex justify-content-center align-items-center w-100 h-100 position-relative"
    >
        <div
            class=" rounded shadow-lg modalPhoto"
            style="
    height: 250px;
    z-index: 1000;
    width: 300px;
    font-family : IranSans;
    position: fixed;
    top:20px;
    left:40%;
    right:10%;
    

    background: #ffffff;
    "
        >
            <div style="width: 100% ; height: 100%;  padding: 3rem 5rem ">
                <div class="d-flex flex-column align-items-center ">
                    {#if success == 0}
                        <div>
                            <Circle2
                                size="60"
                                color="#FF3E00"
                                unit="px"
                                duration="1s"
                            />
                        </div>
                        <div class="mt-3">
                            <p class="text-center">عكس در حال بارگزاريست</p>
                            <p class="text-center">لطفا شكيبا باشيد</p>
                        </div>
                    {:else if success == 1}
                        <div>
                            <img
                                style="width: 75px; height : 75px;"
                                src="./assets/success.png"
                                alt="success"
                            />
                        </div>
                        <div>
                            <p class="text-center my-1 ">
                                عكس با موفقيت آپلود شد
                            </p>
                        </div>
                        <div class="w-full mt-1 d-flex justify-content-center">
                            <button
                                on:click={() => {
                                    modal = false;
                                }}
                                class="w-full bg-danger  text-white  py-2 px-4 border border-0 rounded"
                            >
                                بستن
                            </button>
                        </div>
                    {:else}
                        <div>
                            <img
                                style="width: 75px; height : 75px;"
                                src="./assets/error.png"
                                alt="error"
                            />
                        </div>
                        <div>
                            <p class="text-center my-1">
                                عكس با موفقيت آپلود نشد.
                            </p>
                        </div>
                        <div>
                            <button
                                on:click={() => {
                                    modal = false;
                                }}
                                class="w-full bg-danger  text-white  py-2 px-4 border border-0 rounded"
                            >
                                بستن
                            </button>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<div class="w-100">
    <Row class="w-100">
        <Col
            class=" mx-3 p-2 h-full d-flex flex-column justify-content-center "
            xs="12"
            sm="12"
            md="6"
            lg="4"
            xl="4"
        >
            <div
                class=" bg-white w-100 d-flex flex-column align-items-center justify-content-center px-4 my-2 payment-1"
            >
                <form class="w-75">
                    <div class="w-100 my-1 ">
                        <p class="mx-2 pLabel">تکس آیدی :</p>
                        <input
                            type="text"
                            on:change={() => {
                                if (textId.length < 64) {
                                    textIdError = true;
                                }
                            }}
                            class="w-100 p-2  rounded INPUTcom"
                            bind:value={textId}
                        />
                        {#if textIdError}
                            <p class="text-danger">تکس آیدی صحیح نیست</p>
                        {/if}
                    </div>
                    <div class="w-100 my-1 ">
                        <p class="mx-2 pLabel">Security key :</p>
                        <input
                            class="w-100 p-2  rounded INPUTcom"
                            type="text"
                            bind:value={secretKey}
                        />
                    </div>
                    <div class="w-100 my-1">
                        <p class="mx-2 pLabel">Api key :</p>
                        <input
                            class="w-100 p-2  rounded INPUTcom"
                            type="text"
                            bind:value={apiKey}
                        />
                    </div>
                    <div>
                        <label
                            class="UPLOADFILE my-4 text-center py-2"
                            for="file">آپلود عکس</label
                        >
                        <input
                            type="file"
                            id="file"
                            on:change={(e) => {
                                sendPhoto(e.target.files[0]);
                            }}
                            hidden
                        />
                    </div>
                    <!-- <div class="flex justify-center">
                        <p>صرافی</p>
                        <div>
                          <div class="form-check">
                            <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
                               کوکین
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                            <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault2">
                              بایننس  
                            </label>
                          </div>
                        </div>
                      </div> -->
                    <div style="font-family: IranSans;" class="w-100">
                            <p>صرافی مورد نظر را انتخاب کنید :</p>
                        
                        <div class="w-100  d-flex justify-content-around align-items-center">
                            <div>
                                <button type="button" on:click={()=>{wallet='binance';
                                }} class=" py-2 wallet d-flex justify-content-center align-items-center">
                                     <svg class="mx-2" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 150.61 150.61"><g fill="#f3ba2f"><path d="m38.73 53.2 24.59-24.58 24.6 24.6 14.3-14.31-38.9-38.91-38.9 38.9z"/><path d="m0 63.31 14.3-14.31 14.31 14.31-14.31 14.3z"/><path d="m38.73 73.41 24.59 24.59 24.6-24.6 14.31 14.29-38.9 38.91-38.91-38.88z"/><path d="m98 63.31 14.3-14.31 14.31 14.3-14.31 14.32z"/><path d="m77.83 63.3-14.51-14.52-10.73 10.73-1.24 1.23-2.54 2.54 14.51 14.5 14.51-14.47z"/></g></svg>
                                </button>
                                <p style="font-weight: 700;" class="text-center my-2">Binance</p>
                            </div>
                           <div>
                                <button type="button" on:click={()=>{wallet='kucoin'}}  class=" py-2 wallet d-flex justify-content-center align-items-center">
                                    <img width="50" height="50" src="/assets/kucoin.png" alt="kucoin"/>
                                </button>
                                <p style="font-weight: 700;" class="text-center my-2">Kucoin</p>
                           </div>
                           
                        </div>
                    </div>

                    {#if wallet == "kucoin"}
                        <div class="w-100 my-2 ">
                            <p class="mx-2 pLabel">Passphrase:</p>
                            <input
                                class="w-100 p-2  rounded INPUTcom"
                                type="text"
                                bind:value={passPhrase}
                            />
                        </div>
                    {/if}
                    <Button
                        type="button"
                        on:click={payment}
                        style="font-family : IranSans"
                        class="mt-4 mb-3 w-100"
                        color="primary"
                        block
                        disabled={!btn || !apiKey || !secretKey || !textId}
                        >پرداخت</Button
                    >
                </form>
            </div>
        </Col>
        <Col
            class=" mx-3 p-2 h-100 d-flex flex-column justify-content-center align-items-center"
            xs="12"
            sm="12"
            md="6"
            lg="7"
            xl="7"
        >
            <div
                class=" bg-white w-100 d-flex flex-column align-items-center justify-content-center px-4 my-2 payment-2"
            >
                <div
                    class="d-flex justify-content-center align-items-center flex-column w-100"
                >
                    <p
                        style="font-weight: 700; font-size:20px;font-family : iranSans"
                        class="text-center"
                    >
                        اسکن و پرداخت
                    </p>
                    <img
                        class="mx-auto"
                        src="/assets/Qr.png"
                        style="width: 14rem; height: auto"
                        alt="qrcode"
                    />

                    <p
                        style="font-weight: 800; font-size:30px;font-family: Noto Serif, serif;"
                        class="text-center"
                    >
                        59 USDT
                    </p>
                    <p
                        style="font-weight: 800; font-size:30px;font-family: Noto Serif, serif;"
                        class="text-center my-2"
                    >
                        OR
                    </p>
                </div>
                <p>مقدار بالا را به آدرس کیف پول زیر ارسال کنید</p>
                <p class="addressP">{address}</p>
            </div>
        </Col>
    </Row>
</div>

<style>
    .UPLOADFILE {
        background-color: rgb(52, 174, 52);
        border-radius: 5px;
        color: white;
        width: 100%;
        cursor: pointer;
        font-family: "IranSans";
        font-weight: 800;
    }
    .payment-1 {
        height: 95vh;
        border-radius: 15px;
        font-family: "IranSans";
    }
    .payment-2 {
        height: 95vh;
        border-radius: 15px;
        font-family: "IranSans";
    }

    .addressP {
        font-weight: bold;
        font-size: 2.5vw;
    }
    @font-face {
        font-family: "IranSans";
        src: url("/assets/fonts/iranSans/IRANSansWebFaNum.woff") format("woff");
        font-style: normal;
    }
    .pLabel {
        font-family: "IranSans";
        font-weight: 500;
        font-size: 16px;
    }
    .INPUTcom {
        outline: none;
        border: 1px solid #dcdcdc;
    }
    .INPUTcom:focus {
        outline: 1px solid skyblue;
        border: none;
    }

    .wallet{
        background-color: white;
        border: none;
        border-radius: 10px;
        box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
        width: 100px;
        height: 80px;
        cursor: pointer;
        
    }

    .wallet:hover , .wallet:focus , .wallet:active{
        background-color: black;
        color: white;
        border-radius: 10px;
        box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
        width: 100px;
        height: 80px;
        cursor: pointer;
        
        
    }

    @media screen and (max-width: 900px) {
        .payment-1 {
            height: auto;
            padding: 5px;
        }
        .payment-2 {
            height: auto;
            padding: 5px;
        }
        .modalPhoto {
            position: fixed;
            width: 80% !important;
            top: 15px !important;
            left: 10% !important;
            right: 10% !important;
        }
    }
</style>
