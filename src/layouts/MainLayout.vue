<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-grad-1 text-white row justify-center" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://img.freepik.com/vetores-gratis/mao-desenhada-design-passaro-fenix_23-2148493896.jpg?t=st=1741833470~exp=1741837070~hmac=fb2ce9f9e648a6304a08454eaf6eb354f68fb79d407803b46139e04485abdb96&w=740">
          </q-avatar>
          Gastail
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Perfil" />
        <q-route-tab to="/page3" label="Histórico" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
