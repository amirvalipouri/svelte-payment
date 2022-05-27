<script>
	import {onMount} from 'svelte'
	import {page} from './store/store'
	import 'bootstrap/dist/css/bootstrap.min.css';
	import Login from './page/login/Login.svelte'
	import Payment from './page/payment/Payment.svelte'
	import Finish from './page/finish/Finish.svelte'
	

	let current;

	onMount(()=>{
		page.subscribe(d => current=d)
	})
</script>

<main>
	{#if current == 0}
		<Login/>
	{:else if current == 1}
		<Payment />
	{:else if current == 2}
		<Finish />
	{/if}
	
</main>

<style>
	main {
		width: 100%;
		overflow-x: hidden;
		direction: rtl;
		font-family: "iranSans";
	}

	@font-face {
        font-family: "IranSans";
        src: url("/assets/fonts/iranSans/IRANSansWebFaNum.woff") format("woff");
        font-style: normal;
    }

		@font-face{
        font-family: 'IranSansMobile';
		src: url("/assets/fonts/iranSans/SansMobile.ttf") format("ttf");
		font-style: normal;
        }

	

	@media (min-width: 640px) {
		main {
			max-width: 100%;
			font-family: "IranSansMobile";
		}
	}
</style>