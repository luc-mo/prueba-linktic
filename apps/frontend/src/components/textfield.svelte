<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements'
  import { cn } from '@/utils'

  const className = ''
  export { className as class }
  export let onInput: FormEventHandler<HTMLInputElement> | undefined = undefined

  const classes = cn(
    'flex w-full h-10 px-3 py-2 bg-gray-700 border-gray-600 text-sm border rounded-md',
    className
  )
</script>

<input
  class={classes}
  on:input={onInput}
  {...$$restProps}
/>