<script>
    // Función principal para calcular todos los elementos del triángulo
    function calcular() {
      const a = parseFloat(document.getElementById('a').value);
      const b = parseFloat(document.getElementById('b').value);
      const c = parseFloat(document.getElementById('c').value);

      // Validación de existencia del triángulo (desigualdad triangular)
      if (a + b <= c || a + c <= b || b + c <= a) {
        alert("Los lados no forman un triángulo válido");
        return;
      }

      // Dibujar triángulo interactivo
      dibujarTriangulo(a, b, c);

      const s = (a + b + c) / 2; // semiperímetro
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // fórmula de Herón
      const perimetro = a + b + c;

      // Función para convertir radianes a grados
      const radToDeg = rad => rad * 180 / Math.PI;

      // Cálculo de ángulos usando ley de cosenos
      const angleA = radToDeg(Math.acos((b**2 + c**2 - a**2) / (2 * b * c)));
      const angleB = radToDeg(Math.acos((a**2 + c**2 - b**2) / (2 * a * c)));
      const angleC = 180 - angleA - angleB;

      // Alturas (base * altura / 2 = área => altura = 2*área/base)
      const ha = (2 * area) / a;
      const hb = (2 * area) / b;
      const hc = (2 * area) / c;

      // Medianas (fórmula estándar de medianas)
      const ma = 0.5 * Math.sqrt(2*b**2 + 2*c**2 - a**2);
      const mb = 0.5 * Math.sqrt(2*a**2 + 2*c**2 - b**2);
      const mc = 0.5 * Math.sqrt(2*a**2 + 2*b**2 - c**2);

      // Bisectrices internas
      const ta = (2 / (b + c)) * Math.sqrt(b * c * s * (s - a));
      const tb = (2 / (a + c)) * Math.sqrt(a * c * s * (s - b));
      const tc = (2 / (a + b)) * Math.sqrt(a * b * s * (s - c));

      // Mostrar resultados
      document.getElementById("angleA").textContent = `Ángulo α (a): ${angleA.toFixed(2)}°`;
      document.getElementById("angleB").textContent = `Ángulo β (b): ${angleB.toFixed(2)}°`;
      document.getElementById("angleC").textContent = `Ángulo γ (c): ${angleC.toFixed(2)}°`;

      document.getElementById("ha").textContent = `Altura ha: ${ha.toFixed(2)}`;
      document.getElementById("hb").textContent = `Altura hb: ${hb.toFixed(2)}`;
      document.getElementById("hc").textContent = `Altura hc: ${hc.toFixed(2)}`;

      document.getElementById("ma").textContent = `Mediana ma: ${ma.toFixed(2)}`;
      document.getElementById("mb").textContent = `Mediana mb: ${mb.toFixed(2)}`;
      document.getElementById("mc").textContent = `Mediana mc: ${mc.toFixed(2)}`;

      document.getElementById("ta").textContent = `Bisectriz ta: ${ta.toFixed(2)}`;
      document.getElementById("tb").textContent = `Bisectriz tb: ${tb.toFixed(2)}`;
      document.getElementById("tc").textContent = `Bisectriz tc: ${tc.toFixed(2)}`;

      document.getElementById("perimetro").textContent = `Perímetro: ${perimetro.toFixed(2)}`;
      document.getElementById("area").textContent = `Área: ${area.toFixed(2)}`;
    }

    // Función para dibujar el triángulo usando SVG
    function dibujarTriangulo(a, b, c) {
      const svg = document.getElementById("triangleSVG");
      const polygon = svg.querySelector("polygon");

      // Escala proporcional para que encaje en el SVG
      const maxLado = Math.max(a, b, c);
      const escala = 200 / maxLado;

      // Punto A (origen)
      const A = { x: 50, y: 250 };

      // Punto B (horizontal hacia la derecha)
      const B = { x: A.x + c * escala, y: 250 };

      // Cálculo del ángulo para posicionar el punto C
      const cosAngle = (b**2 + c**2 - a**2) / (2 * b * c);
      const angle = Math.acos(cosAngle);

      // Coordenadas del punto C
      const C = {
        x: B.x - b * escala * Math.cos(angle),
        y: B.y - b * escala * Math.sin(angle)
      };

      // Dibujar el triángulo
      polygon.setAttribute("points", `${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`);
    }
  </script>