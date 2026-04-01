/**
 * Settings Page - User preferences and app configuration
 * Theme customization, profile settings, display options
 * @route /settings
 */
import React, { useState } from 'react';
import { Save, User, Palette, Sun, Moon, ChevronDown, Check, Camera, Phone, Monitor, MapPin } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, cn, applyTheme, Input } from '@crm/ui';

import { useStore, RootStore, ThemeMode, AccentColor, FontSize, FontFamily } from '@crm/store';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance'>('appearance');
  const { 
    theme, setTheme, 
    accentColor, setAccentColor, 
    fontSize, setFontSize, 
    fontFamily, setFontFamily 
  } = useStore((state: RootStore) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    accentColor: state.accentColor,
    setAccentColor: state.setAccentColor,
    fontSize: state.fontSize,
    setFontSize: state.setFontSize,
    fontFamily: state.fontFamily,
    setFontFamily: state.setFontFamily,
  }));
  const [isSaving, setIsSaving] = useState(false);

  const colors: { name: AccentColor; class: string; label: string }[] = [
    { name: 'indigo', class: 'bg-indigo-600', label: 'Indigo' },
    { name: 'blue', class: 'bg-blue-600', label: 'Blue' },
    { name: 'emerald', class: 'bg-emerald-600', label: 'Emerald' },
    { name: 'rose', class: 'bg-rose-600', label: 'Rose' },
    { name: 'amber', class: 'bg-amber-600', label: 'Amber' },
    { name: 'slate', class: 'bg-slate-800', label: 'Slate' },
  ];

  const handleChangeTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme({ theme: newTheme, accentColor, fontSize, fontFamily });
  };

  const handleChangeAccent = (newAccent: AccentColor) => {
    setAccentColor(newAccent);
    applyTheme({ theme, accentColor: newAccent, fontSize, fontFamily });
  };

  const handleChangeFontSize = (newSize: FontSize) => {
    setFontSize(newSize);
    applyTheme({ theme, accentColor, fontSize: newSize, fontFamily });
  };

  const handleChangeFontFamily = (newFont: FontFamily) => {
    setFontFamily(newFont);
    applyTheme({ theme, accentColor, fontSize, fontFamily: newFont });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1.5">
            Manage your personal profile and application preferences.
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 px-6 h-11 transition-all shadow-md active:scale-95"
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full lg:w-64 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
              activeTab === 'profile' 
                ? "bg-primary/10 text-primary shadow-sm shadow-primary/5" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <User className="w-4.5 h-4.5" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
              activeTab === 'appearance' 
                ? "bg-primary/10 text-primary shadow-sm shadow-primary/5" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Palette className="w-4.5 h-4.5" />
            Appearance
          </button>
        </aside>

        {/* Main Settings Content */}
        <div className="flex-1">
          {activeTab === 'profile' ? (
            <Card className="border-border/50 shadow-2xl shadow-primary/5 bg-card/80 backdrop-blur-md overflow-hidden animate-in slide-in-from-right-4 duration-300">
            <CardHeader className="pb-8 border-b">
                <CardTitle className="text-xl font-semibold text-foreground">Profile Information</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Update your contact details and workspace location.
                </p>
              </CardHeader>
              
              <CardContent className="pt-8 space-y-10">
                {/* Profile Picture Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-card shadow-lg ring-1 ring-border">
                      <img 
                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute -bottom-1 -right-1 p-2 bg-primary rounded-full text-primary-foreground shadow-md hover:opacity-90 transition-all active:scale-90 border-2 border-card">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="font-semibold text-foreground">Profile Picture</h4>
                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-primary text-sm font-semibold hover:underline decoration-2 underline-offset-4">Upload new</button>
                      <button className="text-rose-500 text-sm font-semibold hover:underline decoration-2 underline-offset-4">Remove</button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Mobile Number</label>
                    <Input icon={<Phone />} defaultValue="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Alternate Contact</label>
                    <Input icon={<Phone />} defaultValue="+1 (555) 987-6543" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Desk Number</label>
                    <Input icon={<Monitor />} defaultValue="D-402" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Desk / VoIP Phone No.</label>
                    <Input icon={<Phone />} defaultValue="+1 (555) 111-2222" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Bay / Workspace Location</label>
                    <Input icon={<MapPin />} defaultValue="Building A, Floor 4, Bay 3" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Office Address</label>
                    <Input icon={<MapPin />} defaultValue="123 Tech Boulevard, Suite 500, San Francisco, CA 94105" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50 shadow-2xl shadow-primary/5 bg-card backdrop-blur-md overflow-hidden animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="pb-8 border-b border-border/50">
                <CardTitle className="text-xl font-semibold text-foreground">Appearance Settings</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Customize how the application looks and feels on your device.
                </p>
              </CardHeader>
              
              <CardContent className="pt-8 space-y-10">
                {/* Theme Color */}
                <section className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Theme Color</label>
                  <div className="flex flex-wrap gap-4">
                    {colors.map((color) => (
                      <div key={color.name} className="flex flex-col items-center gap-2.5">
                        <button
                          onClick={() => handleChangeAccent(color.name)}
                          className={cn(
                            "w-12 h-12 rounded-full transition-all flex items-center justify-center ring-2 ring-offset-2 ring-transparent active:scale-90",
                            color.class,
                            accentColor === color.name && "ring-primary ring-offset-4"
                          )}
                        >
                          {accentColor === color.name && <Check className="w-5 h-5 text-white" />}
                        </button>
                        <span className="text-[11px] font-medium text-slate-500 capitalize">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Display Mode */}
                <section className="space-y-4">
                  <label className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Display Mode</label>
                  <div className="flex bg-muted/50 p-1.5 rounded-2xl w-full max-w-md border border-border relative">
                    <div 
                      className={cn(
                        "absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] bg-card rounded-xl shadow-sm transition-all duration-300 ease-out z-0",
                        theme === 'light' ? "left-1.5" : 
                        theme === 'dark' ? "left-[calc(33.333%+2px)]" :
                        "left-[calc(66.666%+2px)]"
                      )} 
                    />
                    <button
                      onClick={() => handleChangeTheme('light')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-3 py-3 rounded-xl z-10 transition-colors",
                        theme === 'light' ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Sun className={cn("w-5 h-5", theme === 'light' ? "text-primary" : "text-muted-foreground")} />
                      <span className="text-sm">Light</span>
                    </button>
                    <button
                      onClick={() => handleChangeTheme('dark')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-3 py-3 rounded-xl z-10 transition-colors",
                        theme === 'dark' ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Moon className={cn("w-5 h-5", theme === 'dark' ? "text-primary" : "text-muted-foreground")} />
                      <span className="text-sm">Dark</span>
                    </button>
                    <button
                      onClick={() => handleChangeTheme('system')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-3 py-3 rounded-xl z-10 transition-colors",
                        theme === 'system' ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Monitor className={cn("w-5 h-5", theme === 'system' ? "text-foreground" : "text-muted-foreground")} />
                      <span className="font-semibold text-sm">System</span>
                    </button>
                  </div>
                </section>

                {/* Font Family */}
                <section className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Font Family</label>
                  <div className="relative group max-w-md">
                    <select 
                      value={fontFamily}
                      onChange={(e) => handleChangeFontFamily(e.target.value as FontFamily)}
                      className="appearance-none w-full bg-muted/20 border border-border text-foreground py-3.5 px-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium cursor-pointer"
                    >
                      <option value="Be Vietnam Pro">Be Vietnam Pro (Default)</option>
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none transition-transform group-hover:text-slate-600" />
                  </div>
                </section>

                <section className="space-y-4">
                  <label className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Font Size</label>
                  <div className="flex bg-muted/50 p-1.5 rounded-2xl w-full max-w-md border border-border relative">
                    <div 
                      className={cn(
                        "absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] bg-card rounded-xl shadow-sm transition-all duration-300 ease-out z-0",
                        fontSize === 'small' && "left-1.5",
                        fontSize === 'medium' && "left-[calc(33.333%+2px)]",
                        fontSize === 'large' && "left-[calc(66.666%+2px)]",
                      )} 
                    />
                    {(['small', 'medium', 'large'] as FontSize[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => handleChangeFontSize(size)}
                        className={cn(
                          "flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-bold z-10 transition-colors capitalize",
                          fontSize === size ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
