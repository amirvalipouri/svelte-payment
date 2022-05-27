<script>
    export let value , type , onChange , label , className , OnInput;
    function typeAction(node) {
		node.type = type;
	}
    
    

</script>

<div class="w-100 ">
    <p class="mx-2 pLabel">{label} : </p>
    <input class={`w-100 p-2  rounded INPUTcom ${className} `} use:typeAction  bind:value on:change={onChange} on:input={OnInput} />
</div>

<style>
    .pLabel{
        font-family: "IranSans";
        font-weight: 700;
        font-size: 18px;
    }
    .INPUTcom{
        outline: none;
        border: 1px solid #dcdcdc;
        
    }
    .INPUTcom:focus{
        outline: 1px solid skyblue;
        border: none;
    }

    @font-face{
        font-family: 'IranSans';
		src: url("./assets/fonts/iranSans/Sans.ttf") format("ttf");
		font-style: normal;
    }
</style>