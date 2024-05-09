<script lang="ts">
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
</script>

<div class="flex items-center justify-center min-h-screen p-4">
  <main class="flex flex-col max-w-md w-full gap-4 p-6 bg-gray-800 rounded-lg">
    <header>
      <h1 class="text-2xl font-bold">
        Log In
      </h1>
    </header>
    <section>
      <form>
        <label class="block mb-4">
          <div class="mb-1 text-gray-300">Username</div>
          <input
            class="flex w-full h-10 px-3 py-2 bg-gray-700 border-gray-600 text-sm border rounded-md"
            type="text"
            name="username"
            value={credentials.username}
            on:input={handleChange}
            required
          />
        </label>
        <label class="block mb-6">
          <div class="mb-1 text-gray-300">Password</div>
          <input
            class="flex w-full h-10 px-3 py-2 bg-gray-700 border-gray-600 text-sm border rounded-md"
            type="password"
            name="password"
            value={credentials.password}
            on:input={handleChange}
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