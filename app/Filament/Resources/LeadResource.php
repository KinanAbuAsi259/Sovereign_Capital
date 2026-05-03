<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeadResource\Pages;
use App\Models\Lead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

// class LeadResource extends Resource
// {
//     protected static ?string $model = Lead::class;

//     protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

//     public static function form(Form $form): Form
//     {
//         return $form
//             ->schema([
//                 Forms\Components\TextInput::make('name')->required(),
//                 Forms\Components\TextInput::make('phone')->tel()->required(),
//                 Forms\Components\TextInput::make('capital_range')->label('Capital Range'),
//                 Forms\Components\Select::make('status')
//                     ->options(['new' => 'New', 'in-process' => 'In Process', 'closed' => 'Closed']),
//                 Forms\Components\Select::make('broker_id')
//                     ->relationship('broker', 'name')
//                     ->label('Assign to Broker'),
//                 Forms\Components\Textarea::make('notes')->columnSpanFull(),
//             ]);
//     }

//     public static function table(Table $table): Table
// {
//     return $table->columns([
//         Tables\Columns\TextColumn::make('name')->searchable(),
//         Tables\Columns\TextColumn::make('status')->badge(),
//         Tables\Columns\TextColumn::make('broker.name')->label('Assigned Broker'),
//         Tables\Columns\TextColumn::make('created_at')->dateTime(),
//     ]);
// }

//     public static function getRelations(): array
//     {
//         return [
//             //
//         ];
//     }

//         public static function getPages(): array
//         {
//             return [
//                 'index' => Pages\ListLeads::route('/'),
//                 'create' => Pages\CreateLead::route('/create'),
//                 'edit' => Pages\EditLead::route('/{record}/edit'),
//             ];
//         }
//     }
