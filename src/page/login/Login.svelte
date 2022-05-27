<script>
    import { Row, Col, Button } from "sveltestrap";
    import Input from "../../components/Input/Input.svelte";
    import { page, emailS, nameS, familyS, phoneS } from "../../store/store";

    let name = "",
        family = "",
        email = "";
    let phone;
    let nextBtn = true , video = false;
    const loginHandler = () => {
        nameS.update((d) => (d = name));
        emailS.update((d) => (d = email));
        familyS.update((d) => (d = family));
        phoneS.update((d) => (d = phone));
        page.update((d) => (d = 1));
        console.log(name)
    };

    let RegName = true;
    let RegFamily = true;

    let nameError = false;
    let familyError = false;
    const regNameHandler = (enter) => {
        const paragraph = enter;
        let pattern = new RegExp(/^[^0-9a-zA-Z@;*&$<>=!{}]+$/);
        console.log(pattern.test(paragraph));
        if (pattern.test(paragraph)) {
            RegName = false;
            nameError = false;
        } else {
            RegName = true;
            nameError = true;
        }
    };

    const regFamilyHandler = (enter)=>{
        const paragraph = enter;
        let pattern = new RegExp(/^[^0-9a-zA-Z@;*&$<>=!{}]+$/);
        console.log(pattern.test(paragraph));
        if(pattern.test(paragraph)){
            RegFamily = false
            familyError=false
        }else{
            RegFamily = true
            familyError=true
        }
    }
</script>

{#if video}
<div class="position-fixed w-100  h-100 top-0" style="background-color: #00000077;z-index:10000">
    <p on:click="{()=> video = false}" class="position-absolute text-center px-3 pt-1 rounded" style="cursor: pointer; top:1rem ; right: 0.5rem  ; height: 2rem ; background-color: tomato; color: white">
        بستن پنجره 
    </p>
    <div class="d-flex align-items-center justify-content-center h-full w-full">
        <!-- svelte-ignore a11y-media-has-caption -->
    <video src='/assets/marvel.m4v' type="video/m4v" controls autoplay style="width: 90%; max-height: 90%;">
        
    </video>
    
    </div>
    
</div>
{/if}

<div class="w-100">
    <Row
        class="d-flex justify-content-center align-items-md-center p-2  shadow"
    >
        <Col
            style="border-radius : 15px"
            class="border shadow m-2 py-2 bg-white"
            xs="12"
            sm="12"
            md="12"
            lg="4"
            xl="4"
        >
            <div
                class="w-100 mx-auto d-flex justify-content-center flex-column align-items-center"
            >
                <img
                    width="180"
                    height="160"
                    src="./assets/logo.png"
                    alt="Logo"
                />
                <p class="text-center marvelTitle">Marvel Trade</p>
            </div>
            <Row
                class="d-flex justify-content-center align-items-center flex-column"
            >
                <Col class="my-1" xs="12" sm="12" md="12" lg="8" xl="8">
                    <div class="w-100 ">
                        <p type="text" class="mx-2 pLabel">نام  : </p>
                        <input  class="w-100 p-2  rounded INPUTcom" on:input={(e) => {
                            regNameHandler(e.target.value);
                        }}  bind:value={name} />
                    </div>
                    {#if nameError}
                        <p class=" my-1 mx-2 text-danger">
                            لطفا نام خود را به فارسي وارد كنيد
                        </p>
                    {/if}
                </Col>
                <Col class="my-1" xs="12" sm="12" md="12" lg="8" xl="8">
                    <div class="w-100 ">
                        <p type="text" class="mx-2 pLabel">نام خانوادگی : </p>
                        <input class="w-100 p-2  rounded INPUTcom" on:input={(e) => {
                            regFamilyHandler(e.target.value);
                        }}  bind:value={family} />
                    </div>
                    {#if familyError}
                        <p class="my-1 mx-2 text-danger">
                            لطفا نام خانوادگي خود را به فارسي وارد كنيد
                        </p>
                    {/if}
                </Col>
                <Col class="my-1" xs="12" sm="12" md="12" lg="8" xl="8">
                    <div class="w-100 ">
                        <p class="mx-2 pLabel">شماره  : </p>
                        <input class="w-100 p-2  rounded INPUTcom"  bind:value={phone} />
                    </div>
                </Col>
                <Col class="my-1" xs="12" sm="12" md="12" lg="8" xl="8">
                    <div class="w-100 ">
                        <p class="mx-2 pLabel">ایمیل  : </p>
                        <input class="w-100 p-2  rounded INPUTcom"  bind:value={email} />
                    </div>
                </Col>
                <Col
                    class="mt-4 mb-2  p-2"
                    xs="12"
                    sm="12"
                    md="12"
                    lg="8"
                    xl="8"
                >
                    <button style="font-family : IranSans;font-weight:500;outline:none;background-color : rgb(52, 174, 52);cursor:pointer" class="w-100 rounded text-white p-2" on:click={()=>{video=true}}>تماشای ویدیو</button>
                </Col>
                <Col
                    class="mt-2 mb-2 p-2"
                    xs="12"
                    sm="12"
                    md="12"
                    lg="8"
                    xl="8"
                >
                    <Button
                        style="font-family : IranSans;font-weight:500"
                        on:click={loginHandler}
                        color="primary"
                        block
                        disabled={!email || !phone || !name || !family}>بعدی</Button
                    >
                </Col>
            </Row>
        </Col>
    </Row>
</div>

<style>
    .marvelTitle {
        font-family: "Noto Serif", serif;
        font-size: 20px;
    }

    .pLabel{
        font-family: "IranSans";
        font-weight: 500;
        font-size: 16px;
    }
    .INPUTcom{
        outline: none;
        border: 1px solid #dcdcdc;
        
    }
    .INPUTcom:focus{
        outline: 1px solid skyblue;
        border: none;
    }

    @font-face {
        font-family: "IranSans";
        src: url("/assets/fonts/iranSans/IRANSansWebFaNum.woff") format("woff");
        font-style: normal;
    }
</style>
