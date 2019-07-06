<template>
<!-- Navbar  -->
    <v-layout >
        <v-toolbar >
            <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-title>Bug's point</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat class='text-none' to='/' router>Home</v-btn>
            <v-btn class='text-none' to='/about' router flat>About</v-btn>
            <v-btn class='text-none' to='/login' router flat>login</v-btn>
            <v-btn class='text-none' to='/signin' router flat>Sign in</v-btn>
            <v-btn class='text-none' to='/contact' router flat>Contact us</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <!-- Drawer for mobile size user -->
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
           :width="250"
            >
            <v-toolbar flat>
            <v-list>
                <v-list-tile>
                <v-list-tile-title class="title">
                    Bug's point
                </v-list-tile-title>
                </v-list-tile>
            </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list dense class="pt-0">
            <v-list-tile
                v-for="item in items"
                :key="item.title"
                router
                :to="item.route"
            >
                <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
            
    </v-navigation-drawer>
    <!--     ----------------------------------------------------------------- -->
  </v-layout>
</template>
<script>

export default {
  
  data () {
    return {
      drawer: false,
       items: [
          { title: 'Home', icon: 'dashboard' , route:'/' },
          { title: 'About', icon: 'question_answer' , route:'/about' }
        ],
        right: null
      }
    }
  
}
</script>
