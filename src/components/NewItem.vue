<script lang="jsx">
import { defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	props:['title','docid','source','time','imgsrc'],
	setup(props, ctx) {
		const router = useRouter()
		const skip = docid => router.push(`/article?id=${props.docid}`)
		return () => (
			<div class="newItem" onClick={skip}>
				<div class="words">
					<h2 class="title">{props.title}</h2>
					<p class="attrs">
						<span class="scouce">{props.source}</span>
						<span class="time">{props.time}</span>
					</p>
				</div>
				<div class="img">
					<img src={props.imgsrc} alt={props.title} />
				</div>
			</div>
		)
	},
})
</script>

<style lang="scss">
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.newItem {
  border-radius: 4px;
  margin-bottom: 3vw;
  display: grid;
  grid-template-columns: 60% 36%;
  grid-column-gap: 4%;
  .words {
    display: grid;
    grid-template-rows: minmax(1.5em, 3em) 12px;
    align-content: space-between;
    .title {
      font-size: 15px;
      line-height: 1.5;
      color: var(--text-color);
    }
    .attrs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 4%;
      font-size: 12px;
      color: #999;
      justify-content: space-between;
      span {
        @extend .truncate;
      }
      .time {
        text-align: right;
      }
    }
  }
  .img {
    justify-items: end;
    img {
      width: 100%;
      height: 20vw;
      object-fit: cover;
    }
  }
}
</style>
