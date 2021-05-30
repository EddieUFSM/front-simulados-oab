import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart(props) {
  const [report, setReport] = useState({})
  const [downloaded, setDownloaded] = useState(false)
  const [series, setSeries] = useState([{
    name: 'Series 1',
    data: [],
  }])
  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false
      },
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ["penal",
        "civil",
        "administrativo",
        "processual civil",
        "constitucional",
        "empresarial",
        "processual penal",
        "trabalhista",
        "processual do trabalho",
        "tributario",
        "humanos",
        "código de defesado consumidor",
        "estatuto da crianca e adolescente",
        "ambiental",
        "internacional",
        "filosofia do direito",
        "estatuto da advocacia",
        "regulamento geral",
        "código de etica",
        "disciplinada oab"],
    },
    yaxis: {
      forceNiceScale: true,
      floating: false,
      decimalsInFloat: true,
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        }
      },
      title: {
        text: '(acertos)'
      },

      min: 0,
      max: 100,
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " %"
        }
      }
    }
  })
  const init = async () => {
    setReport(props.report)
    let disciplines = [{ name: "penal" },
    { name: "civil" },
    { name: "administrativo" },
    { name: "processualcivil" },
    { name: "constitucional" },
    { name: "empresarial" },
    { name: "processualpenal" },
    { name: "trabalhista" },
    { name: "processualdotrabalho" },
    { name: "tributario" },
    { name: "humanos" },
    { name: "codigodedefesadoconsumidor" },
    { name: "estatutodacriancaeadolescente" },
    { name: "ambiental" },
    { name: "internacional" },
    { name: "filosofiadodireito" },
    { name: "estatutodaadvocacia" },
    { name: "regulamentogeral" },
    { name: "codigodeetica" },
    { name: "disciplinadaoab" }]
    let arrayDiscipline = []
    let arrayData = []
    disciplines.map(async (discipline) => {
      let result = await props.report.totalByDiscipline.[discipline.name].hits / props.report.totalByDiscipline.[discipline.name].total
      if (props.report.totalByDiscipline.[discipline.name].total > 0) {
        arrayDiscipline.push(discipline.name)
        arrayData.push(Math.round(result * 100))
        setSeries([{ name: 'Series 1', data: arrayData }])
        setOptions({
          chart: {
            toolbar: {
              show: false
            },
            height: 350,
            type: 'radar',
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1
            }
          },

          stroke: {
            width: 2
          },
          fill: {
            opacity: 0.1
          },
          markers: {
            size: 0
          },
          yaxis: {
            title: {
              text: '(acertos)'
            },
            tickAmount: 5,
            min: 0,
            max: 100,

          },
          xaxis: {
            categories: arrayDiscipline,
          },
        })
      }
    })
  }

  useEffect(() => {
    init().then(async () => {
      setDownloaded(true)
    })

  }, [])

  return (
    <div id="chart" style={{ width: "100%", paddingLeft: '10%', paddingRight: '10%', }}>
      {downloaded ? <ReactApexChart options={options} series={series} type="bar" /> : <></>}
    </div>
  )
}

export default ApexChart