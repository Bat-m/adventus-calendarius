<script lang="ts">
  import db from "./db";
  import { onMount } from "svelte";
  import Markdown from "@magidoc/plugin-svelte-marked";
  let allCases: any = [];
  onMount(async () => {
    allCases = await db.cases.all();
  });

  let selected: number;

  let cardBackShowing = false;

  const toggleBackFront = (e: any, bdDay: number, bdMonth: number) => {
    var a = new Date();
    var day = a.getDate();
    var month = a.getMonth();
    if (Number(bdDay) <= day && bdMonth - 1 === month) {
      //a decommenter une fois en prod

      // if same card clicked twice to toggle front and back
      if (selected === Number(e.target.dataset.cardId)) {
        selected = null;
        cardBackShowing = !cardBackShowing;
      } else {
        cardBackShowing = !cardBackShowing;
        selected = Number(e.target.dataset.cardId);
      }
    }
  };
</script>

<main>
  <div class="row">
    {#each allCases as { day, title, content, type, photo, link, month }}
      <div class="flip-box" class:flip-box-spe={selected === 21}>
        <div class="flip-box-inner" class:show-back={selected === day}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="flip-box-front card"
            on:click={(e) => toggleBackFront(e, day, month)}
            data-card-id={day}
          >
            {day}
			<div class="gift" class:show-gift={selected === day}>
				<i></i>
				<i></i>
			  </div>
          </div>

          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="flip-box-back container"
            on:click={(e) => toggleBackFront(e, day, month)}
            data-card-id={day}
          >
            <div
              style="flex-shrink: 0; height:{type === 'photo'
                ? '50%'
                : type === 'musique' || type === 'video'
                ? '70%'
                : '1%'};"
            >
              {#if type === "story"}
                <div
                  style="width:100%; height:0; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;"
                />
              {/if}
			  {#if type === "link"}
			  <div
                  style="width:100%; height:0; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;"
                />
              {/if}
              {#if type === "photo"}
                <img
                  style="width:100%; height:100%; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;"
                  src={photo}
                  alt=""
                />
              {/if}
              {#if type === "musique"}
                <iframe
				
                  style="width:100%; height:100%; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;"
                  width="200"
                  height="200"
                  src={link}
                  title="yuyube"
                  frameborder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
				  class:show-gift={selected !== day}
                />
              {/if}
              {#if type === "video"}
                <video
                  style="width:100%; height:100%; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;"
                  width="200"
                  height="200"
                  controls
                >
                  <track kind="captions" />
                  <source src={link} type="video/mp4" />
                </video>
              {/if}
            </div>
            <div
              style="display:flex; flex: 1; flex-direction: column; justify-content: space-between; background:white; border-radius: 0.5rem; border-bottom-right-radius: 0.5rem;"
            >
              <div style="flex:1; margin:0.5em;">
                <p
                  style="font-size: 0.875rem; line-height: 1.25rem; font-weight: 500; color:#818cf8; margin:0;"
                >
                  {type}
                </p>
                <div style="display:block; margin:0; margin-top: 0.5rem; ">
                  <p
                    style="font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; color:#0284c7; margin:0;"
                  >
                    {title}
                  </p>

                  <p
                    style="margin:0; margin-top: 0.75rem; font-size: 1rem; line-height: 1rem; color:#7dd3fc;"
                  >
					{#if type === "link"}
						<a href={link} style="width:100%; height:0; object-fit:cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; color:#7dd3fc;" > Donne ici !</a>
					{:else}
						<Markdown source={content ? content : ""} />
					{/if}
                  </p>
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
<style lang="scss">
	@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
  	@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
	*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}



.gift {
    width: 50px;
    height: 45px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 0 #c9d6e0, 0 12px 0 #aabbc8;
    position: absolute;
    margin: auto;
    top: 21px;
	right: 16px;
	transform: rotate(45deg);
    &:after,
    &:before {
        content: '';
        position: absolute;
        width: 5px;
        height: 57.5px;
        left: 25%;
        margin-left: 10px;
        background-color: #f3867f;
    }

    &:before {
        height: 50px;

        transform: rotate(90deg);
    }

}

i {
    width: 20px;
    height: 15px;
    border: 4px solid #f3867f;
    position: absolute;
    top: 50%;
    margin-top: -12px;
    left: 50%;
    border-radius: 100% 20px 20px 30%;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);

    &:last-child {
        transform: rotateY(180deg);
        left: auto;
        right: 50%;
    }
}


 

  :global(body) {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    background-color: #F5624D;
    line-height: 1.6;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10%;
  }
  .flip-box {
    background-color: transparent;
    width: 200px;
    height: 310px;
    margin: 0 20px 40px;
    border: 1px solid #f1f1f1;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    border: none;
    flex:auto;
  }

  div.flip-box:nth-child(21).flip-box-spe{
    height: 700px;
  }

  .flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .show-back {
    transform: rotateY(180deg);
  }

  .show-gift{
	visibility: hidden;
  }

  /* Position the front and back side */
  .flip-box-front,
  .flip-box-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  /* Style the front side */
  .flip-box-front {
    border-radius: 0.5rem;
    background-color: #0f8a5f;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  /* Style the back side */
  .flip-box-back {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    color: black;
    transform: rotateY(180deg) translateX(6px);
  }

  img {
    max-height: 100%;
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #235e6f;
    font-size: x-large;
  }

  .container {
    border-radius: 0.5rem;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
