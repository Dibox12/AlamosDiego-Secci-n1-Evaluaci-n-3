package com.Alamos.BaseDeDatos.config;

import com.Alamos.BaseDeDatos.Model.Mueble;
import com.Alamos.BaseDeDatos.Repository.RepositorioMueble;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RepositorioMueble repositorioMueble;

    @Override
    public void run(String... args) throws Exception {
        if (repositorioMueble.count() == 0) {
            crearMueble("Silla Eames", "Silla", 45000.0, 50, "activo", "Mediano", "Plástico y Madera");
            crearMueble("Mesa de Centro", "Mesa", 120000.0, 20, "activo", "Pequeño", "Vidrio y Metal");
            crearMueble("Sofá Chesterfield", "Sofá", 550000.0, 5, "activo", "Grande", "Cuero");
            crearMueble("Estantería Industrial", "Estantería", 85000.0, 15, "activo", "Grande", "Metal y Madera");
            crearMueble("Escritorio Gamer", "Escritorio", 200000.0, 10, "activo", "Mediano", "Melamina");
            System.out.println("--- Datos de prueba cargados exitosamente ---");
        }
    }

    private void crearMueble(String nombre, String tipo, Double precio, Integer stock, String estado, String tamano, String material) {
        Mueble m = new Mueble();
        m.setNombre(nombre);
        m.setTipo(tipo);
        m.setPrecioBase(precio);
        m.setStock(stock);
        m.setEstado(estado);
        m.setTamano(tamano);
        m.setMaterial(material);
        repositorioMueble.save(m);
    }
}
