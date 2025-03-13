<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card v-if="usuario != null" class="q-ma-md w100 border-left">
      <div class="q-pl-sm q-pt-sm text-bold text-primary text-h5">
        Perfil
      </div>
      <q-card-section>
        Nome<br><strong>{{ usuario.nome }}</strong>
      </q-card-section>
      <q-card-section>
        Username<br><strong>{{ usuario.username }}</strong>
      </q-card-section>
      <q-card-section>
        Saldo<br><strong>{{ Utils.formataBRL(usuario.saldo) }}</strong>
      </q-card-section>
      <q-card-section>
        Criado em<br><strong>{{ usuario.created_at }}</strong>
      </q-card-section>
    </q-card>
    <q-card v-if="usuario_data != null" class="q-ma-md w100 border-left">
      <div class="q-pl-sm q-pt-sm text-bold text-primary text-h5">
        Resumo
      </div>
      <q-card-section>
        <canvas ref="chartCanvas"></canvas>
      </q-card-section>
      <q-card-section>
        Entradas<br><strong>{{ Utils.formataBRL(usuario_data.entradas) }}</strong>
      </q-card-section>
      <q-card-section>
        Gastos<br><strong>{{ Utils.formataBRL(usuario_data.gastos) }}</strong>
      </q-card-section>
      <q-card-section>
        Investimentos<br><strong>{{ Utils.formataBRL(usuario_data.investimentos) }}</strong>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-xl">
      <q-card-section>
        <q-btn
          color="primary"
          label="Falar com o Bot"
          @click="Utils.openBotUrl()"
          icon="send"
          icon-right="chat"
          glossy
        />
      </q-card-section>
    </q-card>
    
  </q-page>
</template>
<script setup>
import { onBeforeMount, ref, onMounted } from "vue";
import Mock from "src/Mock";
import Utils from "src/Utils";
import Chart from "chart.js/auto";

const usuario = ref(null);
const usuario_data = ref(null);
const chartCanvas = ref(null);
let chartInstance = null;

onBeforeMount(() => {
  usuario.value = Mock.generateUsuarioMock();
  usuario_data.value = Mock.generateUsuarioDataMock();
});

onMounted(() => {
  if (chartCanvas.value) {
    renderChart();
  }
});

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy(); // Evita duplicação do gráfico
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: "pie",
    data: {
      labels: ["Entradas", "Gastos", "Investimentos"],
      datasets: [
        {
          data: [
            usuario_data.value.entradas,
            usuario_data.value.gastos,
            usuario_data.value.investimentos
          ],
          backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};
</script>
<style scoped>
@media (min-width: 600px) {
  .q-card {
    max-width: 400px;
  }
}
</style>