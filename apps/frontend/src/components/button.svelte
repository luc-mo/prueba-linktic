<script lang="ts">
  import clsx from 'clsx'
  import { cn } from '@/utils'

  type Types = 'button' | 'submit'
  type Variants = 'outlined' | 'contained'

  export let type: Types = 'button'
  export let variant: Variants = 'contained'
  export let onClick: (() => void | Promise<void>) | undefined = undefined

  let className = ''
  export { className as class }

  const classes = cn(clsx(
    'flex items-center justify-center h-9 px-3 text-sm font-medium rounded-md transition-colors',
    {
      'bg-gray-700 hover:bg-gray-600': variant === 'contained',
      'bg-transparent border border-gray-600 hover:bg-gray-700': variant === 'outlined'
    }
  ), className)
</script>

<button
  class={classes}
  type={type}
  on:click={onClick}
>
  <slot/>
</button>