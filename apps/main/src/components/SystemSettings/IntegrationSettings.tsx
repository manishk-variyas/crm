/**
 * IntegrationSettings - Third-party service integrations
 */
interface Integration {
  name: string;
  status: string;
  icon: string;
}

const integrations: Integration[] = [
  { name: 'Slack', status: 'Not connected', icon: 'S' },
  { name: 'Google Workspace', status: 'Not connected', icon: 'G' },
  { name: 'Salesforce', status: 'Not connected', icon: 'S' },
  { name: 'HubSpot', status: 'Not connected', icon: 'H' },
];

export function IntegrationSettings() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold text-foreground">Integrations</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Connect with third-party services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-5 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:shadow-sm transition-all duration-200 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-lg">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{item.status}</div>
              </div>
            </div>
            <button className="text-[11px] font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}