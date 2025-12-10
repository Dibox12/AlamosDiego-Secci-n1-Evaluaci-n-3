import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { VariantsComponent } from './pages/variants/variants.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { MuebleFormComponent } from './pages/catalog/mueble-form/mueble-form.component';
import { VariantFormComponent } from './pages/variants/variant-form/variant-form.component';
import { PublicCatalogComponent } from './pages/public-catalog/public-catalog.component';

export const routes: Routes = [
    { path: '', redirectTo: 'public', pathMatch: 'full' },
    { path: 'public', component: PublicCatalogComponent },
    { path: 'admin/catalog', component: CatalogComponent },
    { path: 'admin/catalog/new', component: MuebleFormComponent },
    { path: 'admin/catalog/edit/:id', component: MuebleFormComponent },
    { path: 'admin/variants', component: VariantsComponent },
    { path: 'admin/variants/new', component: VariantFormComponent },
    { path: 'admin/variants/edit/:id', component: VariantFormComponent },
    { path: 'admin/quotes', component: QuotesComponent }
];
