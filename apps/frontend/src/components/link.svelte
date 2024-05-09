<script lang="ts">
  import clsx from 'clsx'
  type Variants = 'outlined' | 'contained'

  export let href: string
  export let external = false
  export let variant: Variants = 'contained'

  $: target = external ? '_blank' : undefined
  $: rel = external ? 'noopener noreferrer' : undefined

  const classes = clsx(
    'flex items-center justify-center h-9 px-3 text-sm font-medium rounded-md transition-colors',
    {
      'bg-gray-700 hover:bg-gray-600': variant === 'contained',
      'bg-transparent border border-gray-600 hover:bg-gray-700': variant === 'outlined'
    }
  )
</script>

<a
  class={classes}
  href={href}
  target={target}
  rel={rel}
>
  <slot/>
</a>