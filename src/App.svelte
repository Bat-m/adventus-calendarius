<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import db from './db'
  import { onMount } from 'svelte';
  import { dataset_dev } from 'svelte/internal';

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
    {#each allCases as {day, title, content, type, photo, link}, index}
      <div class="flip-box">
        <div class="flip-box-inner" class:show-back={selected === day}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="flip-box-front card" on:click={(e)=>toggleBackFront(e)} data-card-id={day}>
           {day}
          </div>
  
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="flip-box-back container"  on:click={(e)=>toggleBackFront(e)} data-card-id={day}>
            <div class="flex-shrink-0">
              {#if type==="photo"}
                  <img class="h-full w-full object-cover" src={photo} alt="" />
              {/if}
              {#if type==="musique"}
                  <iframe width="300" height="315" src={link} title="yuyube"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              {/if}
              {#if type==="video"}
                  <video  width="400" controls autoplay >
                    <track kind="captions">
                      <source src={link}
                              type="video/mp4">
                  </video>
              {/if}
          </div>
          <div class="flex flex-1 flex-col justify-between bg-white p-6">
              <div class="flex-1">
                      <p class="text-sm font-medium text-indigo-600">{type}</p>
                  <div class="mt-2 block">
                      <p class="text-xl font-semibold text-gray-900"> {title}</p>
                      <p class="mt-3 text-base text-gray-500">{content}</p>
                  </div>
              </div>
          </div>
          </div>
        </div>
        
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
    border:none;

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
    border-radius: 0.5rem;
		background-color: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	}

	/* Style the back side */
	.flip-box-back {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
    border-radius: 0.5rem;
		background-color: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		color: black;
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
    display: flex;
    justify-content: center;
    align-items: center;
	}

	/* Some left and right padding inside the container */
	.container {
		/* padding: 0 5px 0 5px; */
    padding-left: 2px;
    padding-right: 5px;
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