<script lang="ts">
  import { page } from '$app/stores';

  console.log(page);
</script>

<h1>Invoice</h1>
<p>{$page.params.id}</p>
<p>Visit <a href="/">Home</a></p>
