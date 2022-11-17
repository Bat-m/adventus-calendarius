<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import db from './db'
  import { onMount } from 'svelte';

  let allCases: any=[];
  onMount(async() => {
    allCases = await db.cases.all()
    console.log("🚀 ~ file: App.svelte ~ line 9 ~ onMount ~ allCases", allCases)
  })

  let selected: number;
	$:console.log(selected)
	
	let cardBackShowing = false;
	
	const toggleBackFront = (e:any) => {
		// if same card clicked twice to toggle front and back
		if (selected === Number(e.target.dataset.cardId)) {
			selected = null;
			cardBackShowing = !cardBackShowing;
		} else {
			cardBackShowing = !cardBackShowing;
			selected = Number(e.target.dataset.cardId)
		}
	}
</script>

<main>
  <div class="row">
    {#each allCases as {day, title, content}, index}
      <div class="flip-box">
        <div class="flip-box-inner" class:show-back={selected === index}>
          <div class="flip-box-front card">
           {day}
          </div>
  
          <div class="flip-box-back container">
            <h2>{title}</h2>
            
            <p>{content}</p> 
          </div>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <footer on:click={toggleBackFront} data-card-id={index}>Ouvrir</footer>
      </div>
      {:else}
		<p>loading...</p>
    {/each}
  </div>	
</main>

<style>
	h1 {
		margin: 0 0 5px;
	}
	
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 10%;
	}
	/* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-box {
		background-color: transparent;
		width: 200px;
		height: 310px;
		margin: 0 20px 40px;
		border: 1px solid #f1f1f1;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-box-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip when you move the mouse over the flip box container */
/* 	.flip-box:hover .flip-box-inner {
		transform: rotateY(180deg);
	} */
	
	.show-back {
		transform: rotateY(180deg);
	}

	/* Position the front and back side */
	.flip-box-front, .flip-box-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Style the front side */
	.flip-box-front {
		background-color: #000;
	}

	/* Style the back side */
	.flip-box-back {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: black;
		color: white;
		width: 196px;
		height: 300px;
		transform: rotateY(180deg) translateX(6px);
	}


	img {
		max-height: 100%;

	}	

	footer {
		width: 200px;
		font-weight: 800;
		padding: 5px 2px;
		text-align: center;
		border: 1px solid darkgray;
		border-top: 1px solid black;
/* 		box-shadow: 0 0 2px black; */
		cursor: pointer;
		transition: .3s all;
	}
	
	footer:hover {
		color: #fff;
		background-color: #000;
		border: 1px solid black;
	}
	
	footer:active {
		color: #000;
		background-color: #888
	}

		/* Three columns side by side */
	/* .column {
		float: left;
		width: 33.3%;
		margin-bottom: 16px;
		padding: 0 8px;
	} */

	/* Display the columns below each other instead of side by side on small screens */
	/* @media screen and (max-width: 650px) {
		.column {
			width: 100%;
			display: block;
		}
	}
	 */
	/* Add some shadows to create a card effect */
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

	/* Some left and right padding inside the container */
	.container {
		padding: 5px;
	}

	/* Clear floats */
/* 	.container::after, .row::after {
		content: "";
		clear: both;
		display: table;
	} */
	
	h2 {
		margin: 5px 0 0 0;
	}	

	.title {
		color: grey;
	}

	.button {
		border: none;
		outline: 0;
		display: inline-block;
		padding: 8px;
		font-weight: bold;
		background-color: #FFF;
		text-align: center;
		cursor: pointer;
		width: 80%;
	}

	.button:hover {
		background-color: goldenrod;
	}

</style>