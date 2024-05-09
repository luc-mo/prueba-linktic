<script lang="ts">
  import { goto } from '$app/navigation'
  import { HttpClient } from '@/services/http-client'
  import { AuthService } from '@/services/auth'

  import { appStore } from '@/store/app-store'
  import { userStore } from '@/store/user-store'
  import Textfield from '@/components/textfield.svelte'

  let credentials = {
    username: '',
    password: ''
  }

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const { name, value } = target
    credentials = {
      ...credentials,
      [name]: value
    }
  }
  
  const handleSubmit = async(event: SubmitEvent) => {
    try {
      event.preventDefault()
      appStore.set({ loading: true })
      const { username, role, token } = await AuthService.login(credentials)
      HttpClient.setAuthToken(token)
      userStore.set({ username, role })
      goto('/')
    } catch (error) {
      console.error(error)
    } finally {
      appStore.set({ loading: false })
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen p-4">
  <main class="flex flex-col max-w-md w-full gap-4 p-6 bg-gray-800 rounded-lg">
    <header>
      <h1 class="text-2xl font-bold">
        Log In
      </h1>
    </header>
    <section>
      <form on:submit={handleSubmit}>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block mb-4">
          <div class="mb-1 text-gray-300">Username</div>
          <Textfield
            name="username"
            value={credentials.username}
            onInput={handleChange}
            required
          />
        </label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block mb-6">
          <div class="mb-1 text-gray-300">Password</div>
          <Textfield
            type="password"
            name="password"
            value={credentials.password}
            onInput={handleChange}
            required
          />
        </label>
        <button
          class="flex items-center justify-center w-full h-10 px-3 mt-4 text-sm text-white bg-blue-500 rounded-md"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </section>
  </main>
</div>