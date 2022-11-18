<script lang="ts">
  import db from './db'
  import { onMount } from 'svelte';
  import snarkdown from 'snarkdown';
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
  let md = '_this_ is **easy** to `use`.';
var html: string 
console.log(html);
  const renderMd=(md:string)=>{
    html = snarkdown(md)
    return html
  }
</script>

<main>
  <div class="row">
    {#each allCases as {day, title, content, type, photo, link}, index}
      <div class="flip-box">
        <div class="flip-box-inner" class:show-back={selected === day}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="flip-box-front card" on:click={(e)=>{toggleBackFront(e);renderMd(content)}} data-card-id={day}>
           {day}
          </div>
  
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="flip-box-back container"  on:click={(e)=>toggleBackFront(e)} data-card-id={day}>
            <div style="flex-shrink: 0; height:{type==="photo"?"50%":type==="musique"||type==="video"?"70%":"1%"};" >
              {#if type==="story"}
                  <img style="width:100%; height:0; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;" src={photo} alt="" />
              {/if}
              {#if type==="photo"}
                  <img style="width:100%; height:100%; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;" src={photo} alt="" />
              {/if}
              {#if type==="musique"}
                  <iframe width="200" height="200" src={link} title="yuyube"  frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              {/if}
              {#if type==="video"}
                  <video  width="200" height="200" controls >
                    <track kind="captions">
                      <source src={link}
                              type="video/mp4">
                  </video>
              {/if}
          </div>
          <div style="display:flex; flex: 1; flex-direction: column; justify-content: space-between; background:white; border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem;">
              <div style="flex:1;" >
                      <p style="font-size: 0.875rem; line-height: 1.25rem; font-weight: 500; color:#4f46e5; margin:0;">{type}</p>
                  <div style="display:block; margin:0; margin-top: 0.5rem; " >
                      <p style="font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; color:#111827; margin:0;" > {title}</p>
                      <p style="margin:0; margin-top: 0.75rem; font-size: 1rem; line-height: 1rem; color:#6b7280;" >{@html html}</p>
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
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

:global(body) {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  background-color: #333;
  line-height: 1.6;
}
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
    border-radius: 0.5rem;
		/* padding: 0 5px 0 5px; */
    margin-left: 5px;
    margin-right: 5px;
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