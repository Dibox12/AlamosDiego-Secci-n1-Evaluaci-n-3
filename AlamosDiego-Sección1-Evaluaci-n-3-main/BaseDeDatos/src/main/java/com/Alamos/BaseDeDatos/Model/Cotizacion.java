package com.Alamos.BaseDeDatos.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cotizacion")
public class Cotizacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean confirmada;
    private String cliente;
    private java.time.LocalDate fecha;
    private Double total;


    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL)
    @JsonManagedReference // 👈 Evita la recursión hacia atrás
    private List<ItemCotizacion> items;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public boolean isConfirmada() { return confirmada; }
    public void setConfirmada(boolean confirmada) { this.confirmada = confirmada; }

    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public java.time.LocalDate getFecha() { return fecha; }
    public void setFecha(java.time.LocalDate fecha) { this.fecha = fecha; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public List<ItemCotizacion> getItems() { return items; }
    public void setItems(List<ItemCotizacion> items) { this.items = items; }
}
