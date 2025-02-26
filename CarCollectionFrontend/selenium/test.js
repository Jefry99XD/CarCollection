const { Builder, By, until } = require('selenium-webdriver');

(async function testLogin() {
  let driver = await new Builder().forBrowser('firefox').build(); // Usa 'firefox' o 'edge' si prefieres

  try {
    await driver.get('http://localhost:4200/login'); // Ajusta la URL si es necesario

    // Encuentra los campos y botones
    await driver.findElement(By.css('[data-cy=username]')).sendKeys('jeffrytech99@gmail.com');
    await driver.findElement(By.css('[data-cy=password]')).sendKeys('loquendoxd');
    await driver.findElement(By.css('[data-cy=login-button]')).click();

    // Espera a que la página se redirija
    await driver.wait(until.urlContains('/profile-info'), 5000);

    console.log('✅ Prueba exitosa: Redirigido al perfil');
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  } finally {
    await driver.quit(); // Cierra el navegador
  }
})();
