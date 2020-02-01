<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Logar como professor</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="login"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="senha"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="logar">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data(){
      return{
        login: "",
        senha: "",
        role: "professor"
      }
    },
    methods: {
      logar(){
        let user = { nome: this.login, role: this.role }
        window.localStorage.setItem('user', JSON.stringify(user))
        this.$cookie.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjRjMmU0MWM5ZDQ0MDAwMDcwMGJmNCIsInJvbGUiOiJwcm9mZXNzb3IiLCJpYXQiOjE1NzI5ODk5Njh9.WA_BYEfC4MhONydSZNb38I9W476zwDO-YaKsL3jpaGs', 1);
        this.$emit('login-status')
        if(this.role == "professor")
          this.$router.push('exercicios')
      }
    }
  }
</script>