/**
 * Create Quote Page - UI for generating new sales quotes
 * Includes quote header details and line item management
 * @route /quotes/create
 */
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Plus, 
  Trash2, 
  Info,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  PageHeader, 
  PageActions, 
  FormInput, 
  FormSelect, 
  cn 
} from '@crm/ui';

interface LineItem {
  id: string;
  product: string;
  sku: string;
  billingType: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export function CreateQuote() {
  const navigate = useNavigate();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  
  // Form states for adding a new line item
  const [newLineItem, setNewLineItem] = useState({
    product: '',
    sku: '',
    billingType: 'Fixed (HW/SW)',
    quantity: 1,
    unitPrice: 0
  });

  const handleAddLineItem = () => {
    if (!newLineItem.product) return;
    
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLineItem,
      total: newLineItem.quantity * newLineItem.unitPrice
    };
    
    setLineItems([...lineItems, newItem]);
    setNewLineItem({
      product: '',
      sku: '',
      billingType: 'Fixed (HW/SW)',
      quantity: 1,
      unitPrice: 0
    });
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const subTotal = lineItems.reduce((acc, item) => acc + item.total, 0);
  const taxRate = 0.09; // 9% CGST + 9% SGST
  const cgst = subTotal * taxRate;
  const sgst = subTotal * taxRate;
  const totalAmount = subTotal + cgst + sgst;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button 
            onClick={() => navigate('/quotes')}
            className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quotes
          </button>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Create Quote</h1>
          <p className="text-muted-foreground font-medium mt-1">Generate a new quote for a customer.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/quotes')} className="h-10 px-6 font-bold rounded-xl border-border/60">
            Cancel
          </Button>
          <Button variant="outline" className="h-10 px-6 font-bold rounded-xl border-border/60 flex items-center gap-2">
            <Save className="w-4 h-4 text-muted-foreground" />
            Save Draft
          </Button>
          <Button className="h-10 px-6 font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate PDF & Send
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Quote Header Card */}
        <Card className="rounded-3xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-extrabold tracking-tight">Quote Header</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              <FormSelect 
                label="Customer" 
                placeholder="Select Customer"
                options={[
                  { value: 'john-doe', label: 'John Doe' },
                  { value: 'jane-smith', label: 'Jane Smith' }
                ]}
              />
              <FormSelect 
                label="Account" 
                placeholder="Select Account"
                options={[
                  { value: 'acme', label: 'Acme Corp' },
                  { value: 'mass-dynamic', label: 'Massive Dynamic' }
                ]}
              />
              <FormInput 
                label="Customer Address" 
                placeholder="Enter Address"
                icon={<MapPin className="w-4 h-4" />}
              />
              
              <div className="relative">
                <FormInput 
                  label="Quote Number" 
                  defaultValue="Q-2026-8923"
                  className="pr-12"
                />
                <div className="absolute right-3 top-[34px] bg-muted px-2 py-0.5 rounded text-[10px] font-bold text-muted-foreground">
                  v1
                </div>
              </div>
              
              <FormInput 
                label="Quote Date" 
                type="date" 
                defaultValue="2026-04-03"
                icon={<Calendar className="w-4 h-4" />}
              />
              <FormInput 
                label="Valid Until" 
                type="date" 
                defaultValue="2026-05-03"
                icon={<Calendar className="w-4 h-4" />}
              />
              
              <FormSelect 
                label="Currency" 
                defaultValue="INR"
                options={[
                  { value: 'INR', label: 'INR' },
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EUR' }
                ]}
              />
              <FormSelect 
                label="Payment Terms" 
                defaultValue="Net 30"
                options={[
                  { value: 'Net 30', label: 'Net 30' },
                  { value: 'Net 60', label: 'Net 60' },
                  { value: 'Due on Receipt', label: 'Due on Receipt' }
                ]}
              />
              <FormSelect 
                label="GST Structure" 
                defaultValue="intra"
                options={[
                  { value: 'intra', label: 'Intra-State (CGST + SGST)' },
                  { value: 'inter', label: 'Inter-State (IGST)' }
                ]}
              />
              
              <FormInput 
                label="Discount (%)" 
                type="number" 
                defaultValue="0"
                icon={<Info className="w-4 h-4" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Products / Services Card */}
        <Card className="rounded-3xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-card overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-extrabold tracking-tight">Quote Products / Services</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Add Line Item Section */}
            <div className="p-8 bg-muted/20 border-b border-border/40">
              <h4 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mb-6">Add Line Item</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                <div className="col-span-1 md:col-span-1">
                  <FormInput 
                    label="Product / Service" 
                    placeholder="e.g. Cisco Router 2900"
                    value={newLineItem.product}
                    onChange={(e) => setNewLineItem({...newLineItem, product: e.target.value})}
                  />
                </div>
                <div>
                  <FormInput 
                    label="SKU" 
                    placeholder="SKU-123"
                    value={newLineItem.sku}
                    onChange={(e) => setNewLineItem({...newLineItem, sku: e.target.value})}
                  />
                </div>
                <div>
                  <FormSelect 
                    label="Billing Type" 
                    defaultValue="Fixed (HW/SW)"
                    options={[
                      { value: 'Fixed (HW/SW)', label: 'Fixed (HW/SW)' },
                      { value: 'Service (Time)', label: 'Service (Time)' },
                      { value: 'Subscription', label: 'Subscription' }
                    ]}
                    onChange={(e) => setNewLineItem({...newLineItem, billingType: e.target.value})}
                  />
                </div>
                <div>
                  <FormInput 
                    label="Quantity" 
                    type="number"
                    value={newLineItem.quantity.toString()}
                    onChange={(e) => setNewLineItem({...newLineItem, quantity: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <FormInput 
                      label="Unit Price" 
                      type="number"
                      value={newLineItem.unitPrice.toString()}
                      onChange={(e) => setNewLineItem({...newLineItem, unitPrice: parseFloat(e.target.value) || 0})}
                      icon={<DollarSign className="w-4 h-4" />}
                    />
                  </div>
                  <Button 
                    onClick={handleAddLineItem}
                    className="h-10 px-4 font-bold rounded-xl flex items-center gap-2 mb-[1px]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/40">
                    <th className="px-8 py-4 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Product / Service</th>
                    <th className="px-8 py-4 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-widest">SKU</th>
                    <th className="px-8 py-4 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center">Qty / Duration</th>
                    <th className="px-8 py-4 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Unit Price</th>
                    <th className="px-8 py-4 text-left text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Line Total</th>
                    <th className="px-8 py-4 w-20"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {lineItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-16 text-center text-muted-foreground font-medium italic">
                        No items added yet. Add products or services above.
                      </td>
                    </tr>
                  ) : (
                    lineItems.map((item) => (
                      <tr key={item.id} className="group hover:bg-muted/10 transition-colors">
                        <td className="px-8 py-5 text-[14px] font-bold text-foreground">{item.product}</td>
                        <td className="px-8 py-5 text-[13px] font-medium text-muted-foreground">{item.sku || '-'}</td>
                        <td className="px-8 py-5 text-[14px] font-bold text-foreground text-center">{item.quantity}</td>
                        <td className="px-8 py-5 text-[14px] font-bold text-foreground text-right">INR {item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-8 py-5 text-[14px] font-extrabold text-primary text-right">INR {item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-8 py-5 text-right">
                          <button 
                            onClick={() => removeLineItem(item.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="p-8 flex justify-end bg-muted/5 border-t border-border/40">
              <div className="w-full max-w-xs space-y-3">
                <div className="flex justify-between items-center text-[13px] font-bold">
                  <span className="text-muted-foreground">Sub Total:</span>
                  <span className="text-foreground">INR {subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-[13px] font-bold">
                  <span className="text-muted-foreground">CGST (9%):</span>
                  <span className="text-foreground">INR {cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-[13px] font-bold">
                  <span className="text-muted-foreground">SGST (9%):</span>
                  <span className="text-foreground">INR {sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-[14px] font-extrabold text-foreground uppercase tracking-tight">Total Amount:</span>
                  <span className="text-xl font-extrabold text-primary">INR {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
