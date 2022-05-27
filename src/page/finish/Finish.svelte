<script>
    import {page} from '../../store/store'
    import {Row , Col , Button} from 'sveltestrap'
</script>

<div class="w-100">
    <Row class="w-100 p-2 d-flex justify-content-center align-items-center">
        <Col  xs="12" sm="12" md="12" lg="6" xl="6">
            <div class="w-100 bg-white FINISH rounded shadow d-flex flex-column justify-content-center align-items-center">
                <img class="imgSuc" src="/assets/success.png" alt="success" />
                <p class="text-center finishP mt-3">درخواست شما با موفقیت ثبت شد</p>
                <p class="text-center finishP">در کوتاه ترین زمان آنرا بررسی میکنیم.</p>
                <Button  type="button" on:click={()=>{page.update((d) =>(d=0))}} class="mx-2 w-50 my-4" color="danger">بازگشت</Button>
            </div>
        </Col>
    </Row>
</div>


<style>

    .FINISH{
        height: 300px;
        animation: finish 500ms forwards;
        font-family: "IranSans";
    }
   .imgSuc{
       width: 75px;
       height: 75px;
   } 

   .finishP{
       color: rgb(49, 221, 123);
       font-size: 20px;
       font-weight: 600;
   }
   @font-face {
        font-family: "IranSans";
        src: url("/assets/fonts/iranSans/IRANSansWebFaNum.woff") format("woff");
        font-style: normal;
    }

   @keyframes finish {
       from{
           transform: translateX(-150px);
       }
       to{
           transform: translateX(0px);
       }
   }
</style>